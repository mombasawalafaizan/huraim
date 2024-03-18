"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import Image from "next/image";
import { toast } from "sonner";

import { Button } from "@/components/ui/Button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  UncontrolledFormMessage,
} from "@/components/ui/Form";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/Select";
import { Input } from "@/components/ui/Input";
import { productSchema } from "@/lib/validations/product";
import {
  Genders,
  ItemTexture,
  FileWithPreview,
  ProductCategory,
  MeasurementUnits,
  IProduct,
} from "@/types";
import { RadioGroup, RadioGroupItem } from "@/components/ui/RadioGroup";
import { Textarea } from "@/components/ui/Textarea";
import { useEffect, useState, useTransition } from "react";
import { Zoom } from "@/components/ZoomImage";
import { FileDialog } from "@/components/FileDialog";
import { createFilePayload, isArrayOfFile } from "@/lib/utils";
import { uploadFiles } from "@/lib/actions/upload";
import { addProduct, checkProduct } from "@/lib/actions/product";
import { showErrorToast } from "@/lib/handleError";

interface ProductFormProps {
  product?: IProduct;
}

type Inputs = z.infer<typeof productSchema>;

export function ProductForm({ product }: ProductFormProps) {
  const [files, setFiles] = useState<FileWithPreview[] | null>(null);
  const [isPending, startTransition] = useTransition();
  const mode = product ? "create" : "update";

  useEffect(() => {
    if (product?.images && product?.images?.length > 0) {
      setFiles(
        product.images.map((image) => {
          const file = new File([], image.name, {
            type: "image",
          });
          const fileWithPreview = Object.assign(file, {
            preview: image.url,
          });

          return fileWithPreview;
        })
      );
    }
  }, [product]);

  const form = useForm<Inputs>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      name: "",
      description: "",
      MRP: "",
      sellingPrice: "",
      HSNCode: "",
      inspiredBy: "",
      category: ProductCategory.Perfume,
      gender: Genders.Male,
      countryOfOrigin: "India",
      measurementUnit: MeasurementUnits.Milliliter,
      images: [],
    },
  });

  function onSubmit(data: Inputs) {
    console.log("From onSubmit handler:", data);
    startTransition(async () => {
      try {
        await checkProduct({
          name: data.name,
        });

        if (isArrayOfFile(data.images)) {
          const payload = createFilePayload(data.images);
          toast.promise(
            uploadFiles(payload).then((images) => {
              return addProduct({ ...data, images });
            }),
            {
              loading: "Uploading images...",
              success: "Product added successfully.",
              error: "Error uploading images!",
            }
          );
        } else {
          toast.promise(addProduct({ ...data, images: null }), {
            loading: "Uploading product...",
            success: "Product added successfully.",
            error: "Error uploading product!",
          });
        }
        form.reset();
        setFiles(null);
      } catch (err) {
        console.error("Is this called?", err);
        showErrorToast(err);
      }
    });
  }

  return (
    <Form {...form}>
      <form
        className="flex flex-col px-4 py-2 w-full max-w-2xl gap-5"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Product Name</FormLabel>
              <FormControl>
                <Input placeholder="Enter product name here" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Product Description</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Enter Product Description here"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="HSNCode"
          render={({ field }) => (
            <FormItem>
              <FormLabel>HSN Code</FormLabel>
              <FormControl>
                <Input placeholder="Enter HSN Code here" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex w-full flex-col gap-5 sm:space-y-0 sm:gap-6 sm:flex-row">
          <FormField
            control={form.control}
            name="category"
            render={({ field }) => (
              <FormItem className="grow">
                <FormLabel>Product Category</FormLabel>
                <Select
                  value={field.value}
                  onValueChange={(value: typeof field.value) =>
                    field.onChange(value)
                  }
                >
                  <FormControl>
                    <SelectTrigger className="capitalize">
                      <SelectValue placeholder={field.value} />
                    </SelectTrigger>
                  </FormControl>
                  <FormMessage />
                  <SelectContent>
                    <SelectGroup>
                      {Object.values(ProductCategory).map((option) => (
                        <SelectItem
                          key={option}
                          value={option}
                          className="capitalize"
                        >
                          {option}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </FormItem>
            )}
          />
          <div className="flex gap-2">
            <FormField
              control={form.control}
              name="capacity"
              render={({ field }) => (
                <FormItem className="grow">
                  <FormLabel>Capacity</FormLabel>
                  <FormControl>
                    <Input
                      min="0"
                      type="number"
                      inputMode="numeric"
                      value={Number.isNaN(field.value) ? 0 : field.value}
                      onChange={(e) => field.onChange(e.target.valueAsNumber)}
                      placeholder="Enter capacity"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="measurementUnit"
              render={({ field }) => (
                <FormItem className="w-75 flex items-end w-50">
                  <Select
                    value={field.value}
                    onValueChange={(value: typeof field.value) =>
                      field.onChange(value)
                    }
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder={field.value} />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectGroup>
                        {Object.values(MeasurementUnits).map((option) => (
                          <SelectItem key={option} value={option}>
                            {option}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </FormItem>
              )}
            />
          </div>
        </div>
        <div className="flex w-full flex-col gap-5 sm:space-y-0 sm:gap-6 sm:flex-row">
          <FormField
            control={form.control}
            name="sellingPrice"
            render={({ field }) => (
              <FormItem className="grow">
                <FormLabel>Selling Price</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter Selling Price"
                    value={field.value}
                    onChange={field.onChange}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="MRP"
            render={({ field }) => (
              <FormItem className="grow">
                <FormLabel>MRP</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter MRP"
                    value={field.value}
                    onChange={field.onChange}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="flex w-full flex-col gap-5 sm:space-y-0 sm:gap-6 sm:flex-row">
          <FormField
            control={form.control}
            name="texture"
            render={({ field }) => (
              <FormItem className="grow">
                <FormLabel>Product Texture</FormLabel>
                <Select
                  value={field.value}
                  onValueChange={(value: typeof field.value) =>
                    field.onChange(value)
                  }
                >
                  <FormControl>
                    <SelectTrigger className="capitalize">
                      <SelectValue placeholder={field.value} />
                    </SelectTrigger>
                  </FormControl>
                  <FormMessage />
                  <SelectContent>
                    <SelectGroup>
                      {Object.values(ItemTexture).map((option) => (
                        <SelectItem
                          key={option}
                          value={option}
                          className="capitalize"
                        >
                          {option}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="noOfItems"
            render={({ field }) => (
              <FormItem className="grow">
                <FormLabel>No. of Items</FormLabel>
                <FormControl>
                  <Input
                    min="0"
                    type="number"
                    inputMode="numeric"
                    placeholder="Enter No."
                    value={Number.isNaN(field.value) ? "" : field.value}
                    onChange={(e) => field.onChange(e.target.valueAsNumber)}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="countryOfOrigin"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Country of Origin</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter Country of Origin"
                    {...field}
                    disabled
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="gender"
          render={({ field }) => (
            <FormItem className="space-y-3">
              <FormLabel>Used By Which Gender?</FormLabel>
              <FormControl>
                <RadioGroup
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  className="flex flex-col space-y-1"
                >
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value={Genders.Male} />
                    </FormControl>
                    <FormMessage />
                    <FormLabel className="font-normal">
                      {Genders.Male}
                    </FormLabel>
                  </FormItem>
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value={Genders.Female} />
                    </FormControl>
                    <FormMessage />
                    <FormLabel className="font-normal">
                      {Genders.Female}
                    </FormLabel>
                  </FormItem>
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value={Genders.Unisex} />
                    </FormControl>
                    <FormMessage />
                    <FormLabel className="font-normal">Unisex</FormLabel>
                  </FormItem>
                </RadioGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="inspiredBy"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Inspired By</FormLabel>
              <FormControl>
                <Input placeholder="Product is inspired by?" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="fragrance"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Fragrance</FormLabel>
              <FormControl>
                <Input placeholder="Enter Fragrance Type" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="topNotes"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Top Notes</FormLabel>
              <FormControl>
                <Textarea placeholder="Enter Top Notes here..." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="baseNotes"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Base Notes</FormLabel>
              <FormControl>
                <Textarea placeholder="Enter Base Notes here..." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="middleNotes"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Middle Notes</FormLabel>
              <FormControl>
                <Textarea placeholder="Enter Middle Notes here..." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="returnPolicy"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Shipping and Return Policy</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Enter Product Shipping and Return Policy here"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="careInstructions"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Product Care Instructions</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Enter Product Care Instructions here"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormItem className="flex w-full flex-col gap-1.5">
          <FormLabel>Images</FormLabel>
          {files?.length ? (
            <div className="flex items-center gap-2">
              {files.map((file, i) => (
                <Zoom key={i}>
                  <Image
                    src={file.preview}
                    alt={file.name}
                    className="size-20 shrink-0 rounded-md object-cover object-center"
                    width={80}
                    height={80}
                  />
                </Zoom>
              ))}
            </div>
          ) : null}
          <FormControl>
            <FileDialog
              setValue={form.setValue}
              name="images"
              maxFiles={5}
              maxSize={1024 * 1024 * 7}
              files={files}
              setFiles={setFiles}
              // isUploading={isUploading}
              disabled={isPending}
            />
          </FormControl>
          <UncontrolledFormMessage
            message={form.formState.errors.images?.message}
          />
        </FormItem>
        <Button type="submit" className="w-fit">
          Submit
        </Button>
      </form>
    </Form>
  );
}
