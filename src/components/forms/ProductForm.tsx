"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/Button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
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
  MeasurementUnits,
  ProductCategory,
} from "@/types";
import { RadioGroup, RadioGroupItem } from "@/components/ui/RadioGroup";
import { Textarea } from "@/components/ui/Textarea";

type Inputs = z.infer<typeof productSchema>;

export function ProductForm() {
  const form = useForm<Inputs>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      name: "",
      MRP: 0,
      sellingPrice: 0,
      category: ProductCategory.Perfume,
      gender: Genders.Male,
      countryOfOrigin: "India",
      measurementUnit: MeasurementUnits.Milliliter,
      images: [],
    },
  });

  function onSubmit(data: Inputs) {
    console.log(data);
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
                <Input placeholder="Type product name here" {...field} />
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
                <Input placeholder="Type HSN Code here" {...field} />
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
                      min={0}
                      type="number"
                      inputMode="numeric"
                      value={Number.isNaN(field.value) ? "" : field.value}
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
                    min="0"
                    type="number"
                    inputMode="numeric"
                    placeholder="Enter Selling Price"
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
            name="MRP"
            render={({ field }) => (
              <FormItem className="grow">
                <FormLabel>MRP</FormLabel>
                <FormControl>
                  <Input
                    min="0"
                    type="number"
                    inputMode="numeric"
                    placeholder="Enter MRP"
                    value={Number.isNaN(field.value) ? "" : field.value}
                    onChange={(e) => field.onChange(e.target.valueAsNumber)}
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
                    min="1"
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

        <Button type="submit" className="w-fit">
          Submit
        </Button>
      </form>
    </Form>
  );
}
