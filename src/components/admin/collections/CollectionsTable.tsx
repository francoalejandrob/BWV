"use client";

import { useEffect, useRef, useState } from "react";
import { useActionState } from "react";
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
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import {
  createCollection,
  updateCollection,
  deleteCollection,
  type CollectionFormState,
} from "@/app/admin/(dashboard)/collections/actions";
import type { Collection } from "@/lib/supabase/types";

function CollectionDialog({
  open,
  onOpenChange,
  collection,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  collection: Collection | null;
}) {
  const isEditing = Boolean(collection);
  const action = isEditing ? updateCollection : createCollection;
  const [state, formAction, pending] = useActionState<CollectionFormState, FormData>(
    action,
    undefined
  );
  const wasPending = useRef(false);

  useEffect(() => {
    if (wasPending.current && !pending && !state?.error) {
      onOpenChange(false);
    }
    wasPending.current = pending;
  }, [pending, state, onOpenChange]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="border-border bg-surface sm:max-w-md">
        <form action={formAction}>
          <DialogHeader>
            <DialogTitle className="text-ink">
              {isEditing ? "Editar colección" : "Nueva colección"}
            </DialogTitle>
          </DialogHeader>

          {isEditing && <input type="hidden" name="id" value={collection!.id} />}

          <div className="flex flex-col gap-4 py-4">
            <div className="flex flex-col gap-2">
              <Label htmlFor="name">Nombre</Label>
              <Input
                id="name"
                name="name"
                required
                defaultValue={collection?.name}
                placeholder="Originals"
              />
            </div>
            <div className="flex flex-col gap-2">
              <Label htmlFor="slug">Slug</Label>
              <Input
                id="slug"
                name="slug"
                defaultValue={collection?.slug}
                placeholder="originals (se genera solo si lo dejas vacío)"
              />
            </div>
            <div className="flex flex-col gap-2">
              <Label htmlFor="description">Descripción</Label>
              <Textarea
                id="description"
                name="description"
                rows={3}
                defaultValue={collection?.description}
              />
            </div>
            <div className="flex flex-col gap-2">
              <Label htmlFor="sort_order">Orden</Label>
              <Input
                id="sort_order"
                name="sort_order"
                type="number"
                defaultValue={collection?.sort_order ?? 0}
              />
            </div>
          </div>

          {state?.error && (
            <p role="alert" className="mb-3 text-sm text-destructive">
              {state.error}
            </p>
          )}

          <DialogFooter>
            <Button type="submit" disabled={pending}>
              {pending ? "Guardando..." : "Guardar"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export default function CollectionsTable({
  collections,
  productCounts,
}: {
  collections: Collection[];
  productCounts: Record<string, number>;
}) {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editing, setEditing] = useState<Collection | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<Collection | null>(null);
  const [deleteError, setDeleteError] = useState<string | null>(null);

  function openCreate() {
    setEditing(null);
    setDialogOpen(true);
  }

  function openEdit(collection: Collection) {
    setEditing(collection);
    setDialogOpen(true);
  }

  async function confirmDelete() {
    if (!deleteTarget) return;
    const result = await deleteCollection(deleteTarget.id);
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
        <Button onClick={openCreate} className="gap-1.5">
          <Plus className="h-4 w-4" />
          Nueva colección
        </Button>
      </div>

      <div className="overflow-hidden rounded-xl border border-border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nombre</TableHead>
              <TableHead>Slug</TableHead>
              <TableHead>Productos</TableHead>
              <TableHead>Orden</TableHead>
              <TableHead className="w-10" />
            </TableRow>
          </TableHeader>
          <TableBody>
            {collections.length === 0 && (
              <TableRow>
                <TableCell colSpan={5} className="py-8 text-center text-ink-muted">
                  Todavía no hay colecciones.
                </TableCell>
              </TableRow>
            )}
            {collections.map((collection) => (
              <TableRow key={collection.id}>
                <TableCell className="font-medium text-ink">{collection.name}</TableCell>
                <TableCell className="text-ink-muted">{collection.slug}</TableCell>
                <TableCell>
                  <Badge variant="secondary">{productCounts[collection.id] ?? 0}</Badge>
                </TableCell>
                <TableCell className="text-ink-muted">{collection.sort_order}</TableCell>
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
                      <DropdownMenuItem onClick={() => openEdit(collection)}>
                        <Pencil className="h-4 w-4" />
                        Editar
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        variant="destructive"
                        onClick={() => {
                          setDeleteTarget(collection);
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

      <CollectionDialog open={dialogOpen} onOpenChange={setDialogOpen} collection={editing} />

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
              Esta acción no se puede deshacer.
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
