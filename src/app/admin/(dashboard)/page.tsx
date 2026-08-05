import Link from "next/link";
import { supabaseAdmin } from "@/lib/supabase/server";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Layers,
  Shirt,
  AlertTriangle,
  Boxes,
  ShoppingBag,
  Tag,
  BarChart3,
} from "lucide-react";

export const dynamic = "force-dynamic";

type LowStockRow = {
  id: string;
  size: string;
  color: string;
  stock: number;
  products: { name: string; slug: string } | null;
};

export default async function AdminDashboardPage() {
  const supabase = supabaseAdmin();

  const [collectionsRes, productsRes, variantsRes, lowStockRes] = await Promise.all([
    supabase.from("collections").select("*", { count: "exact", head: true }),
    supabase.from("products").select("*", { count: "exact", head: true }),
    supabase.from("product_variants").select("stock"),
    supabase
      .from("product_variants")
      .select("id, size, color, stock, products(name, slug)")
      .lte("stock", 2)
      .order("stock", { ascending: true })
      .limit(8),
  ]);

  const collectionsCount = collectionsRes.count ?? 0;
  const productsCount = productsRes.count ?? 0;
  const totalStock = (variantsRes.data ?? []).reduce((sum, v) => sum + (v.stock ?? 0), 0);
  const lowStock = (lowStockRes.data ?? []) as unknown as LowStockRow[];

  const stats = [
    { label: "Colecciones", value: collectionsCount, icon: Layers, href: "/admin/collections" },
    { label: "Productos", value: productsCount, icon: Shirt, href: "/admin/products" },
    { label: "Unidades en stock", value: totalStock, icon: Boxes, href: "/admin/products" },
    { label: "Variantes con stock bajo", value: lowStock.length, icon: AlertTriangle, href: "/admin/products" },
  ];

  const soon = [
    { label: "Pedidos", description: "Historial de pedidos hechos por WhatsApp.", icon: ShoppingBag },
    { label: "Promociones", description: "Descuentos y códigos de promoción.", icon: Tag },
    { label: "Estadísticas", description: "Tráfico y ventas del sitio.", icon: BarChart3 },
  ];

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="font-display text-2xl font-bold text-ink">Dashboard</h1>
        <p className="mt-1 text-sm text-ink-muted">
          Resumen del catálogo de BWV.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Link key={stat.label} href={stat.href}>
            <Card className="border-border bg-surface transition-colors hover:border-ink/30">
              <CardHeader className="flex flex-row items-center justify-between pb-0">
                <CardDescription className="text-ink-faint">{stat.label}</CardDescription>
                <stat.icon className="h-4 w-4 text-ink-faint" />
              </CardHeader>
              <CardContent>
                <p className="font-display text-3xl font-bold text-ink">{stat.value}</p>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>

      {lowStock.length > 0 && (
        <Card className="border-border bg-surface">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-ink">
              <AlertTriangle className="h-4 w-4 text-destructive" />
              Stock bajo
            </CardTitle>
            <CardDescription>
              Variantes con 2 unidades o menos disponibles.
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col gap-2">
            {lowStock.map((v) => (
              <Link
                key={v.id}
                href={`/admin/products`}
                className="flex items-center justify-between rounded-lg border border-border px-3 py-2 text-sm transition-colors hover:border-ink/30"
              >
                <span className="text-ink">
                  {v.products?.name ?? "—"}{" "}
                  <span className="text-ink-faint">
                    · Talla {v.size}
                    {v.color ? ` · ${v.color}` : ""}
                  </span>
                </span>
                <Badge variant={v.stock === 0 ? "destructive" : "secondary"}>
                  {v.stock === 0 ? "Agotado" : `${v.stock} unidades`}
                </Badge>
              </Link>
            ))}
          </CardContent>
        </Card>
      )}

      <div>
        <h2 className="mb-3 font-display text-sm font-semibold uppercase tracking-[0.15em] text-ink-faint">
          Próximamente
        </h2>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          {soon.map((item) => (
            <Card key={item.label} className="border-dashed border-border bg-surface/50 opacity-70">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-sm text-ink-muted">
                  <item.icon className="h-4 w-4" />
                  {item.label}
                </CardTitle>
                <CardDescription>{item.description}</CardDescription>
              </CardHeader>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
