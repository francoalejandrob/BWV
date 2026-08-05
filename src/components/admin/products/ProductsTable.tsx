"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Plus, MoreHorizontal, Pencil, Trash2 } from "lucide-react";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogAction,
  AlertDialogCancel,
} from "@/components/ui/alert-dialog";
import { deleteProduct, toggleProductActive } from "@/app/admin/(dashboard)/products/actions";

export type ProductRow = {
  id: string;
  name: string;
  slug: string;
  price: number;
  active: boolean;
  collectionName: string;
  thumbnail: string | null;
  totalStock: number;
};

export default function ProductsTable({ products }: { products: ProductRow[] }) {
  const [deleteTarget, setDeleteTarget] = useState<ProductRow | null>(null);
  const [deleteError, setDeleteError] = useState<string | null>(null);
  const [pendingToggle, setPendingToggle] = useState<string | null>(null);

  async function handleToggle(product: ProductRow, active: boolean) {
    setPendingToggle(product.id);
    await toggleProductActive(product.id, active);
    setPendingToggle(null);
  }

  async function confirmDelete() {
    if (!deleteTarget) return;
    const result = await deleteProduct(deleteTarget.id);
    if (result.error) {
      setDeleteError(result.error);
    } else {
      setDeleteTarget(null);
      setDeleteError(null);
    }
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex justify-end">
        <Button render={<Link href="/admin/products/new" />} nativeButton={false} className="gap-1.5">
          <Plus className="h-4 w-4" />
          Nuevo producto
        </Button>
      </div>

      <div className="overflow-hidden rounded-xl border border-border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-14" />
              <TableHead>Nombre</TableHead>
              <TableHead>Colección</TableHead>
              <TableHead>Precio</TableHead>
              <TableHead>Stock</TableHead>
              <TableHead>Activo</TableHead>
              <TableHead className="w-10" />
            </TableRow>
          </TableHeader>
          <TableBody>
            {products.length === 0 && (
              <TableRow>
                <TableCell colSpan={7} className="py-8 text-center text-ink-muted">
                  Todavía no hay productos.
                </TableCell>
              </TableRow>
            )}
            {products.map((product) => (
              <TableRow key={product.id}>
                <TableCell>
                  <div className="relative h-12 w-10 overflow-hidden rounded-md border border-border bg-bg">
                    {product.thumbnail && (
                      <Image
                        src={product.thumbnail}
                        alt={product.name}
                        fill
                        sizes="40px"
                        className="object-cover"
                      />
                    )}
                  </div>
                </TableCell>
                <TableCell>
                  <Link
                    href={`/admin/products/${product.id}`}
                    className="font-medium text-ink hover:underline"
                  >
                    {product.name}
                  </Link>
                </TableCell>
                <TableCell className="text-ink-muted">{product.collectionName}</TableCell>
                <TableCell className="text-ink-muted">${product.price}</TableCell>
                <TableCell>
                  <Badge variant={product.totalStock === 0 ? "destructive" : "secondary"}>
                    {product.totalStock}
                  </Badge>
                </TableCell>
                <TableCell>
                  <Switch
                    checked={product.active}
                    disabled={pendingToggle === product.id}
                    onCheckedChange={(checked) => handleToggle(product, checked)}
                  />
                </TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger
                      render={
                        <Button variant="ghost" size="icon-sm">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      }
                    />
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem
                        render={<Link href={`/admin/products/${product.id}`} />}
                      >
                        <Pencil className="h-4 w-4" />
                        Editar
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        variant="destructive"
                        onClick={() => {
                          setDeleteTarget(product);
                          setDeleteError(null);
                        }}
                      >
                        <Trash2 className="h-4 w-4" />
                        Eliminar
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <AlertDialog
        open={Boolean(deleteTarget)}
        onOpenChange={(open) => {
          if (!open) {
            setDeleteTarget(null);
            setDeleteError(null);
          }
        }}
      >
        <AlertDialogContent className="border-border bg-surface">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-ink">
              ¿Eliminar &quot;{deleteTarget?.name}&quot;?
            </AlertDialogTitle>
            <AlertDialogDescription>
              Se eliminarán también sus fotos, tallas y colores. Esta acción no se puede deshacer.
            </AlertDialogDescription>
          </AlertDialogHeader>
          {deleteError && <p className="text-sm text-destructive">{deleteError}</p>}
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction onClick={confirmDelete} className="bg-destructive text-white">
              Eliminar
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
