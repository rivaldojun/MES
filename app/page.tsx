import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Cpu, Settings, Search } from "lucide-react"

export default function MesDashboard() {
  const ateliers = [
    { id: "decolletage", name: "Décolletage" },
    { id: "fraisage", name: "Fraisage" },
    { id: "tournage", name: "Tournage" },
    { id: "soudure", name: "Soudure" },
    { id: "ressuage", name: "Ressuage" },
    { id: "peinture", name: "Peinture" },
    { id: "montage", name: "Montage" },
  ]

  return (
    <div className="flex min-h-screen flex-col bg-gray-50">
      <header className="sticky top-0 z-50 flex h-16 items-center gap-4 border-b bg-white px-4 shadow-sm sm:px-6">
        <div className="flex flex-1 items-center gap-2">
          <Cpu className="h-6 w-6 text-blue-600" />
          <h1 className="text-lg font-semibold">Système MES</h1>
        </div>
        <div className="flex items-center gap-4">
          <Button variant="outline" size="sm">
            <Search className="mr-2 h-4 w-4" />
            Rechercher
          </Button>
          <Button variant="outline" size="icon" className="rounded-full">
            <Settings className="h-4 w-4" />
            <span className="sr-only">Paramètres</span>
          </Button>
        </div>
      </header>
      <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
        <div className="flex items-center justify-between">
          <h2 className="text-3xl font-bold tracking-tight">Tableau de bord MES</h2>
          <div className="flex items-center gap-2">
            <Button>Exporter les données</Button>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {ateliers.map((atelier) => (
            <Link href={`/ateliers/${atelier.id}`} key={atelier.id}>
              <Card className="hover:bg-gray-50 transition-colors cursor-pointer h-full">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-lg font-medium">{atelier.name}</CardTitle>
                  <Cpu className="h-5 w-5 text-blue-600" />
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {atelier.id === "decolletage" && (
                      <>
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-muted-foreground">Taux de conformité</span>
                          <span className="text-sm font-medium">97.2%</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-muted-foreground">Productivité</span>
                          <span className="text-sm font-medium">65 pièces/h</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-muted-foreground">Temps de cycle</span>
                          <span className="text-sm font-medium">55 sec</span>
                        </div>
                      </>
                    )}

                    {atelier.id === "fraisage" && (
                      <>
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-muted-foreground">Taux de conformité</span>
                          <span className="text-sm font-medium">98.1%</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-muted-foreground">Productivité</span>
                          <span className="text-sm font-medium">42 pièces/h</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-muted-foreground">Temps de cycle</span>
                          <span className="text-sm font-medium">85 sec</span>
                        </div>
                      </>
                    )}

                    {atelier.id === "tournage" && (
                      <>
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-muted-foreground">Taux de conformité</span>
                          <span className="text-sm font-medium">98.7%</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-muted-foreground">Productivité</span>
                          <span className="text-sm font-medium">58 pièces/h</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-muted-foreground">Temps de cycle</span>
                          <span className="text-sm font-medium">62 sec</span>
                        </div>
                      </>
                    )}

                    {atelier.id === "soudure" && (
                      <>
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-muted-foreground">Taux de conformité</span>
                          <span className="text-sm font-medium">96.5%</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-muted-foreground">Productivité</span>
                          <span className="text-sm font-medium">35 pièces/h</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-muted-foreground">Temps de cycle</span>
                          <span className="text-sm font-medium">103 sec</span>
                        </div>
                      </>
                    )}

                    {atelier.id === "ressuage" && (
                      <>
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-muted-foreground">Taux de détection</span>
                          <span className="text-sm font-medium">99.3%</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-muted-foreground">Productivité</span>
                          <span className="text-sm font-medium">48 pièces/h</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-muted-foreground">Temps de cycle</span>
                          <span className="text-sm font-medium">75 sec</span>
                        </div>
                      </>
                    )}

                    {atelier.id === "peinture" && (
                      <>
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-muted-foreground">Taux de conformité</span>
                          <span className="text-sm font-medium">97.8%</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-muted-foreground">Productivité</span>
                          <span className="text-sm font-medium">52 pièces/h</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-muted-foreground">Temps de séchage</span>
                          <span className="text-sm font-medium">45 min</span>
                        </div>
                      </>
                    )}

                    {atelier.id === "montage" && (
                      <>
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-muted-foreground">Taux de conformité</span>
                          <span className="text-sm font-medium">98.5%</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-muted-foreground">Productivité</span>
                          <span className="text-sm font-medium">32 pièces/h</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-muted-foreground">Temps de cycle</span>
                          <span className="text-sm font-medium">112 sec</span>
                        </div>
                      </>
                    )}

                    <div className="mt-4">
                      <Button variant="outline" className="w-full">
                        Voir les détails
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
