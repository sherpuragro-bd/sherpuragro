"use client";

import { createNewProduct } from "@/actions/admin/Product";
import { Input } from "@/app/components/ui/Input";
import { Label } from "@/app/components/ui/Label";
import { LinkHighLight } from "@/app/components/ui/LinkHighLight";
import ArrImageUpload from "@/app/components/widgets/ArrImageUpload";
import { CategorySelect } from "@/app/components/widgets/CategorySelect";
import Editor from "@/app/components/widgets/Editor";
import ExitWarning from "@/app/components/widgets/ExitAlert";
import ImageUpload from "@/app/components/widgets/ImageUpload";
import TagSelect from "@/app/components/widgets/TagSelect";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { verifyUrl } from "@/lib/verifyUrl";
import { Cuboid, Percent } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";
import slugify from "slugify";

const ProductsCreate = () => {
  const [capturedLink, setCapturedLink] = useState("");
  const [permalLink, setPermalLink] = useState("");
  const [debounceTimer, setDebounceTimer] = useState(null);
  const [content, setContent] = useState();
  const [productImages, setproductImages] = useState();
  const [stock, setstock] = useState("stockin");
  const [stockQuantity, setstockQuantity] = useState(0);
  const [tags, settags] = useState();
  const [selectedCategories, setselectedCategories] = useState();
  const [seoImage, setseoImage] = useState();
  const [isPopular, setisPopular] = useState();

  const handlePermalLink = (e) => {
    const inputValue = e.target.value.trim();
    setCapturedLink(inputValue);
    setPermalLink("");
    if (inputValue.length === 0) {
      setPermalLink("");
      if (debounceTimer) clearTimeout(debounceTimer);
      return;
    }

    if (debounceTimer) clearTimeout(debounceTimer);

    const newTimer = setTimeout(async () => {
      const url = slugify(inputValue, { lower: true, strict: true });

      try {
        const permalLinkGenerated = await verifyUrl(url, "product");
        setPermalLink(permalLinkGenerated || url);
      } catch (error) {
        setPermalLink(url);
      }
    }, 1000);

    setDebounceTimer(newTimer);
  };

  const router = useRouter();

  const handelNewProduct = async (e) => {
    e.preventDefault();
    const form = e.target;
    const payload = {
      name: form.name.value,
      permalLink: permalLink,
      description: form.description.value,
      content: content,
      images: productImages,
      stock: stock === "limitedstock" ? stockQuantity : stock,
      price: Number(form.price.value),
      discountPrice: Number(form.discountprice.value),
      status: form.status.value,
      minQuantity: Number(form.minorderquantity.value),
      maxQuantity:
        Number(form.maxorderquantity.value) === 0
          ? null
          : Number(form.maxorderquantity.value),
      categories: selectedCategories,
      tags: tags,
      seoTitle: form.seotitle.value,
      seoDes: form.seodescription.value,
      seoImage: seoImage,
      isPopular: isPopular,
    };
    const res = await createNewProduct(payload);
    if (res?.success) {
      router.push(`/admin/shop/products/update/${permalLink}`);
      toast.success(res.msg);
      return;
    } else {
      toast.error(res.err);
    }
  };
  return (
    <>
      <ExitWarning />
      <form
        onSubmit={handelNewProduct}
        className="flex flex-col md:flex-row justify-between gap-5 w-full"
      >
        <div className="w-full md:w-9/12 border p-5 pb-10">
          <div className="space-y-8">
            <Input
              name="name"
              className="!px-3"
              placeholder="প্রোডাক্ট এর নাম"
              label="নাম"
              required={true}
            />
            <Input
              className="!px-3"
              onChange={handlePermalLink}
              value={permalLink || capturedLink}
              placeholder="/new-product"
              label="পেরমাল লিঙ্ক"
              required={true}
            >
              <p className="mt-4 font-light text-cyan-600">
                প্রিভিউ:{" "}
                <LinkHighLight
                  target="_blank"
                  href={`${process.env.NEXT_PUBLIC_SITE_URL}/products/${permalLink}`}
                >{`${process.env.NEXT_PUBLIC_SITE_URL}/products/${permalLink}`}</LinkHighLight>
              </p>
            </Input>
            <Input
              name="description"
              label={"ডেসক্রিপশন"}
              inputType="textarea"
              className={`!px-3`}
              placeholder={`প্রোডাক্ট ডেসক্রিপশন `}
            />
            <div className="space-y-3 flex !mt-5 flex-col">
              <Label>প্রোডাক্ট কন্টেন্ট</Label>
              <Editor setContent={setContent} content={content} />
            </div>
            <div className="space-y-3">
              <Label>প্রোডাক্ট ইমেজস</Label>
              <ArrImageUpload
                disabled={!permalLink}
                folder={`/products/${permalLink}`}
                onUpload={setproductImages}
                htmlFor={`productImages`}
              />
            </div>
            <div className="space-y-3 border p-5 pb-8">
              <Label required={true}>স্টক</Label>
              <RadioGroup
                onValueChange={setstock}
                className={`flex gap-5`}
                defaultValue={stock}
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="limitedstock" />
                  <Label>ইন স্টক</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="stockin" />
                  <Label>আনলিমিটেড স্টক</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="stockout" />
                  <Label>স্টক আউট</Label>
                </div>
              </RadioGroup>
              {stock === "limitedstock" && (
                <Input
                  icon={<Cuboid strokeWidth={1.2} />}
                  name="stockquantity"
                  type="number"
                  onChange={(e) => setstockQuantity(Number(e.target.value))}
                  placeholder="0"
                  label="স্টক এর পরিমাণ"
                  required={true}
                />
              )}
            </div>
            <div className="border p-5 pb-8 space-y-3">
              <Label required={true}>অভারভিও</Label>
              <div className="flex gap-5 w-full">
                <Input
                  type="number"
                  name="price"
                  placeholder="মূল্য"
                  icon={
                    <span className="text-3xl font-light flex -translate-y-2 text-primary">
                      ৳
                    </span>
                  }
                />
                <Input
                  type="number"
                  name="discountprice"
                  placeholder="ডিসকাউন্ট"
                  icon={<Percent className="text-primary" />}
                />
              </div>
            </div>
            <div className="border p-5 pb-8 space-y-3">
              <Label>সার্চ ইঞ্জিন অপ্টিমাইজ</Label>
              <div className="border p-5 space-y-5">
                <Input
                  type="text"
                  className={`!px-3`}
                  name="seotitle"
                  placeholder="SEO শিরোনাম"
                  label="শিরোনাম"
                />
                <Input
                  inputType="textarea"
                  type="number"
                  className={`!px-3`}
                  name="seodescription"
                  placeholder="SEO বর্ণনা"
                  label="বর্ণনা"
                />
                <ImageUpload
                  disabled={!permalLink}
                  folder={`/products/${permalLink}/seo`}
                  onUpload={setseoImage}
                  compressOption={{ maxSizeMB: 1, maxWidthOrHeight: 1000 }}
                  htmlFor={`seoImage`}
                  label={`SEO ছবি`}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="w-full md:w-3/12 space-y-5">
          <div className="border p-5">
            <Input
              required={true}
              type="number"
              className={`!px-3`}
              name="minorderquantity"
              placeholder="০"
              label="সর্বনিম্ন অর্ডার পরিমাণ"
            />
          </div>
          <div className="border p-5">
            <Input
              name="maxorderquantity"
              type="number"
              className={`!px-3`}
              placeholder="০"
              label="সর্বোচ্চ অর্ডার পরিমাণ"
            />
          </div>
          <CategorySelect onChange={setselectedCategories} />
          <TagSelect defaultTags={tags} onChange={settags} />
          <div className="border flex items-center p-5 gap-3">
            <Switch onCheckedChange={setisPopular} />
            <Label>পপুলার</Label>
          </div>
          <div className="border p-5 space-y-3">
            <Label>পাবলিশ</Label>
            <div className="border p-3 space-y-3">
              <Label required={true}>প্রোডাক্ট স্টেটাস </Label>
              <Select name="status" defaultValue="published">
                <SelectTrigger>
                  <SelectValue placeholder="স্টেটাস সিলেক্ট করুন " />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem value="published">পাবলিশ</SelectItem>
                    <SelectItem value="draft">ড্রাফট</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
            <button className="w-full bg-gradient-to-r from-primary to-primary/60 text-white px-5 py-2 rounded-md border border-primary">
              সেভ করুন
            </button>
          </div>
        </div>
      </form>
    </>
  );
};

export default ProductsCreate;
