import { getAllProductDataForAdmin } from "@/actions/admin/Product";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { convertToBengaliNumbers } from "@/lib/utils";
import { SquarePen } from "lucide-react";
import moment from "moment";
import Image from "next/image";
import Link from "next/link";
import DeleteProduct from "./DeleteProduct";
import BulkDelete from "./BulkDelete";

const ProductDataTableSSR = async () => {
  const products = await getAllProductDataForAdmin();

  return (
    <div className="border border-t-0">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-20">সিলেক্ট</TableHead>

            <TableHead className="w-20">ইমেজ</TableHead>

            <TableHead>নাম</TableHead>
            <TableHead>স্টক</TableHead>
            <TableHead>মূল্য</TableHead>
            <TableHead>স্ট্যাটাস</TableHead>
            <TableHead>তৈরি করার সময় </TableHead>
            <TableHead className="text-right">অপারেশন্স</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {products ? (
            products?.map((product) => (
              <TableRow key={product.id}>
                <TableCell>
                  <BulkDelete id={product.id} />
                </TableCell>
                <TableCell className="font-medium">
                  <Link
                    className="hover:text-primary hover:underline"
                    href={`/admin/shop/products/${product.permalLink}`}
                  >
                    <Image
                      className="rounded-md border"
                      alt={product.name}
                      src={product.images[0]}
                      width={50}
                      height={50}
                    />
                  </Link>
                </TableCell>
                <TableCell className="font-medium">
                  <Link
                    className="hover:text-primary hover:underline"
                    href={`/admin/shop/products/${product.permalLink}`}
                  >
                    {product.name}
                  </Link>
                </TableCell>
                <TableCell>
                  {product.stock === "stockout" ? (
                    <span className="bg-red-600/30 text-red-600  px-2 rounded-sm">
                      স্টক আউট
                    </span>
                  ) : product.stock === "stockin" ? (
                    <span className="bg-green-600/20 text-green-500 px-2 rounded-sm">
                      স্টক ইন
                    </span>
                  ) : (
                    <span className="bg-sky-600/30 text-sky-600 px-2 rounded-sm">
                      {convertToBengaliNumbers(product.stock)} টি
                    </span>
                  )}
                </TableCell>
                <TableCell className="font-medium">
                  {product.discountPrice ? (
                    <span>
                      <span className="text-primary">
                        ৳{convertToBengaliNumbers(product.discountPrice)}
                      </span>
                      <span className="line-through ml-1 text-xs">
                        {convertToBengaliNumbers(product.price)}
                      </span>
                    </span>
                  ) : (
                    `$${product.price}`
                  )}
                </TableCell>
                <TableCell>
                  {product.status === "published" ? (
                    <span className="bg-green-600/20 text-green-500 px-2 rounded-sm">
                      পাবলিশড
                    </span>
                  ) : (
                    <span className="bg-yellow-600/20 text-yellow-500 px-2 rounded-sm">
                      ড্রাফট
                    </span>
                  )}
                </TableCell>
                <TableCell className="font-en font-bold">
                  {moment(product.createdAt).fromNow()}
                </TableCell>
                <TableCell className="flex gap-2 justify-end mt-2">
                  <Link
                    className="text-white bg-gradient-to-r flex w-fit p-1 rounded-md from-primary to-primary/60 border border-primary hover:underline"
                    href={`/admin/shop/products/${product.permalLink}`}
                  >
                    <SquarePen size={20} />
                  </Link>
                  <DeleteProduct id={product?.id} />
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>কোন প্রোডাক্ট নেই</TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default ProductDataTableSSR;
