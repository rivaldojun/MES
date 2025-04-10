"use client"
import type React from "react"
import { Cpu, Search, BarChart3, Clock, Activity, Menu } from "lucide-react"
import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Link from "next/link"
import {

  Settings,
  CheckCircle,
  Info,
  Database,
  PenToolIcon as Tool,
  ArrowLeftCircle,
  AlertTriangle,
  Users,
  Zap,
  Droplet,
} from "lucide-react"

interface AtelierData {
  id: string
  name: string
  qualityControl: string
  machineInfo: string
  pieceInfo: string
  mesConnection: string
  controlTools: string
  specificMetrics: {
    title: string
    value: string
    description: string
    trend: string
    icon: React.ReactNode
    trendUp: boolean
  }[]
  defectTypes: {
    name: string
    percentage: number
    color: string
  }[]
  machineParameters: {
    name: string
    value: string
    percentage: number
    status: "green" | "amber" | "red" | "blue"
  }[]
}

export default function AtelierPage({ params }: { params: { id: string } }) {
  const atelierData: Record<string, AtelierData> = {
    decolletage: {
      id: "decolletage",
      name: "Décolletage",
      qualityControl: "Contrôle dimensionnel et d'état de surface",
      machineInfo:
        "- Vitesse de rotation (tr/min)\n- Avance (mm/tr)\n- Pression du lubrifiant\n- Température de l'outil\n- Vibrations",
      pieceInfo:
        "- Dimensions critiques\n- État de surface\n- Tolérance géométrique\n- Numéro de lot\n- Traçabilité matière",
      mesConnection: "OPC UA\n- Tours à commande numérique\n- Capteurs de vibration\n- Capteurs de température",
      controlTools: "- Micromètres\n- Pieds à coulisse numériques\n- Rugosimètres\n- Projecteurs de profil",
      specificMetrics: [
        {
          title: "Taux de conformité",
          value: "97.2%",
          description: "Dernières 24h",
          trend: "+0.3%",
          icon: <CheckCircle className="h-4 w-4 text-green-500" />,
          trendUp: true,
        },
        {
          title: "Productivité",
          value: "65",
          description: "pièces/heure",
          trend: "+2",
          icon: <Activity className="h-4 w-4 text-blue-500" />,
          trendUp: true,
        },
        {
          title: "Temps de cycle",
          value: "55",
          description: "secondes",
          trend: "-2s",
          icon: <Clock className="h-4 w-4 text-indigo-500" />,
          trendUp: true,
        },
        {
          title: "Usure d'outil",
          value: "68%",
          description: "Durée de vie restante",
          trend: "-5%",
          icon: <Tool className="h-4 w-4 text-amber-500" />,
          trendUp: false,
        },
      ],
      defectTypes: [
        { name: "Dimensions hors tolérance", percentage: 42, color: "bg-red-500" },
        { name: "État de surface non conforme", percentage: 28, color: "bg-amber-500" },
        { name: "Bavures", percentage: 18, color: "bg-blue-500" },
        { name: "Autres", percentage: 12, color: "bg-gray-500" },
      ],
      machineParameters: [
        { name: "Vitesse de rotation", value: "2500 tr/min", percentage: 83, status: "green" },
        { name: "Avance", value: "0.15 mm/tr", percentage: 75, status: "green" },
        { name: "Pression lubrifiant", value: "5.8 bar", percentage: 88, status: "amber" },
        { name: "Température outil", value: "62°C", percentage: 70, status: "blue" },
      ],
    },
    fraisage: {
      id: "fraisage",
      name: "Fraisage",
      qualityControl: "Contrôle dimensionnel et géométrique",
      machineInfo:
        "- Vitesse de rotation (tr/min)\n- Avance (mm/min)\n- Profondeur de passe\n- Température de l'outil\n- Vibrations",
      pieceInfo: "- Dimensions critiques\n- Planéité\n- Perpendicularité\n- État de surface\n- Numéro de lot",
      mesConnection: "MQTT\n- Fraiseuses CNC\n- Capteurs de vibration\n- Capteurs de température",
      controlTools:
        "- MMT (Machine à Mesurer Tridimensionnelle)\n- Comparateurs\n- Rugosimètres\n- Jauges de profondeur",
      specificMetrics: [
        {
          title: "Taux de conformité",
          value: "98.1%",
          description: "Dernières 24h",
          trend: "+0.2%",
          icon: <CheckCircle className="h-4 w-4 text-green-500" />,
          trendUp: true,
        },
        {
          title: "Productivité",
          value: "42",
          description: "pièces/heure",
          trend: "+1",
          icon: <Activity className="h-4 w-4 text-blue-500" />,
          trendUp: true,
        },
        {
          title: "Temps de cycle",
          value: "85",
          description: "secondes",
          trend: "-3s",
          icon: <Clock className="h-4 w-4 text-indigo-500" />,
          trendUp: true,
        },
        {
          title: "Usure d'outil",
          value: "72%",
          description: "Durée de vie restante",
          trend: "-4%",
          icon: <Tool className="h-4 w-4 text-amber-500" />,
          trendUp: false,
        },
      ],
      defectTypes: [
        { name: "Dimensions hors tolérance", percentage: 38, color: "bg-red-500" },
        { name: "Défauts géométriques", percentage: 32, color: "bg-amber-500" },
        { name: "État de surface non conforme", percentage: 20, color: "bg-blue-500" },
        { name: "Autres", percentage: 10, color: "bg-gray-500" },
      ],
      machineParameters: [
        { name: "Vitesse de rotation", value: "3200 tr/min", percentage: 80, status: "green" },
        { name: "Avance", value: "250 mm/min", percentage: 65, status: "green" },
        { name: "Profondeur de passe", value: "2.5 mm", percentage: 83, status: "green" },
        { name: "Température outil", value: "58°C", percentage: 65, status: "blue" },
      ],
    },
    tournage: {
      id: "tournage",
      name: "Tournage",
      qualityControl: "Contrôle dimensionnel et d'état de surface",
      machineInfo:
        "- Vitesse de rotation (tr/min)\n- Avance (mm/tr)\n- Profondeur de passe\n- Température de l'outil\n- Vibrations",
      pieceInfo: "- Diamètres\n- Longueurs\n- Cylindricité\n- État de surface\n- Numéro de lot",
      mesConnection: "OPC UA\n- Tours CNC\n- Capteurs de vibration\n- Capteurs de température",
      controlTools: "- Micromètres\n- Pieds à coulisse numériques\n- Comparateurs\n- Rugosimètres",
      specificMetrics: [
        {
          title: "Taux de conformité",
          value: "98.7%",
          description: "Dernières 24h",
          trend: "+0.4%",
          icon: <CheckCircle className="h-4 w-4 text-green-500" />,
          trendUp: true,
        },
        {
          title: "Productivité",
          value: "58",
          description: "pièces/heure",
          trend: "+3",
          icon: <Activity className="h-4 w-4 text-blue-500" />,
          trendUp: true,
        },
        {
          title: "Temps de cycle",
          value: "62",
          description: "secondes",
          trend: "-2s",
          icon: <Clock className="h-4 w-4 text-indigo-500" />,
          trendUp: true,
        },
        {
          title: "Usure d'outil",
          value: "65%",
          description: "Durée de vie restante",
          trend: "-6%",
          icon: <Tool className="h-4 w-4 text-amber-500" />,
          trendUp: false,
        },
      ],
      defectTypes: [
        { name: "Dimensions hors tolérance", percentage: 40, color: "bg-red-500" },
        { name: "État de surface non conforme", percentage: 30, color: "bg-amber-500" },
        { name: "Défauts géométriques", percentage: 20, color: "bg-blue-500" },
        { name: "Autres", percentage: 10, color: "bg-gray-500" },
      ],
      machineParameters: [
        { name: "Vitesse de rotation", value: "2800 tr/min", percentage: 85, status: "green" },
        { name: "Avance", value: "0.18 mm/tr", percentage: 72, status: "green" },
        { name: "Profondeur de passe", value: "1.8 mm", percentage: 90, status: "amber" },
        { name: "Température outil", value: "65°C", percentage: 75, status: "blue" },
      ],
    },
    soudure: {
      id: "soudure",
      name: "Soudure",
      qualityControl: "Contrôle visuel et test d'étanchéité",
      machineInfo: "- Intensité (A)\n- Tension (V)\n- Vitesse de soudage\n- Débit de gaz\n- Température",
      pieceInfo: "- Aspect visuel\n- Pénétration\n- Résistance mécanique\n- Étanchéité\n- Numéro de lot",
      mesConnection: "MQTT\n- Postes de soudage\n- Caméras de vision\n- Capteurs de température",
      controlTools:
        "- Caméras d'inspection\n- Équipements de test d'étanchéité\n- Jauges de soudure\n- Testeurs ultrasoniques",
      specificMetrics: [
        {
          title: "Taux de conformité",
          value: "96.5%",
          description: "Dernières 24h",
          trend: "+0.2%",
          icon: <CheckCircle className="h-4 w-4 text-green-500" />,
          trendUp: true,
        },
        {
          title: "Productivité",
          value: "35",
          description: "pièces/heure",
          trend: "+1",
          icon: <Activity className="h-4 w-4 text-blue-500" />,
          trendUp: true,
        },
        {
          title: "Temps de cycle",
          value: "103",
          description: "secondes",
          trend: "-5s",
          icon: <Clock className="h-4 w-4 text-indigo-500" />,
          trendUp: true,
        },
        {
          title: "Consommation électrodes",
          value: "82%",
          description: "Efficacité",
          trend: "+2%",
          icon: <Zap className="h-4 w-4 text-yellow-500" />,
          trendUp: true,
        },
      ],
      defectTypes: [
        { name: "Porosités", percentage: 35, color: "bg-red-500" },
        { name: "Manque de fusion", percentage: 25, color: "bg-amber-500" },
        { name: "Fissures", percentage: 22, color: "bg-blue-500" },
        { name: "Autres", percentage: 18, color: "bg-gray-500" },
      ],
      machineParameters: [
        { name: "Intensité", value: "185 A", percentage: 78, status: "green" },
        { name: "Tension", value: "22.5 V", percentage: 82, status: "green" },
        { name: "Débit de gaz", value: "12 L/min", percentage: 65, status: "blue" },
        { name: "Température", value: "450°C", percentage: 90, status: "amber" },
      ],
    },
    ressuage: {
      id: "ressuage",
      name: "Ressuage",
      qualityControl: "Détection de défauts de surface",
      machineInfo:
        "- Température du bain\n- Temps d'immersion\n- Temps de séchage\n- Pression de rinçage\n- Luminosité d'inspection",
      pieceInfo: "- Présence de fissures\n- Porosités\n- Défauts de surface\n- Numéro de lot\n- Traçabilité",
      mesConnection: "REST API\n- Équipements de ressuage\n- Capteurs de température\n- Caméras UV",
      controlTools: "- Lampes UV\n- Caméras d'inspection\n- Étalons de référence\n- Luxmètres",
      specificMetrics: [
        {
          title: "Taux de détection",
          value: "99.3%",
          description: "Dernières 24h",
          trend: "+0.1%",
          icon: <CheckCircle className="h-4 w-4 text-green-500" />,
          trendUp: true,
        },
        {
          title: "Productivité",
          value: "48",
          description: "pièces/heure",
          trend: "+2",
          icon: <Activity className="h-4 w-4 text-blue-500" />,
          trendUp: true,
        },
        {
          title: "Temps de cycle",
          value: "75",
          description: "secondes",
          trend: "-3s",
          icon: <Clock className="h-4 w-4 text-indigo-500" />,
          trendUp: true,
        },
        {
          title: "Consommation produits",
          value: "95%",
          description: "Efficacité",
          trend: "+1%",
          icon: <Droplet className="h-4 w-4 text-blue-500" />,
          trendUp: true,
        },
      ],
      defectTypes: [
        { name: "Fissures", percentage: 45, color: "bg-red-500" },
        { name: "Porosités", percentage: 30, color: "bg-amber-500" },
        { name: "Inclusions", percentage: 15, color: "bg-blue-500" },
        { name: "Autres", percentage: 10, color: "bg-gray-500" },
      ],
      machineParameters: [
        { name: "Température bain", value: "22°C", percentage: 75, status: "green" },
        { name: "Temps d'immersion", value: "15 min", percentage: 80, status: "green" },
        { name: "Temps de séchage", value: "10 min", percentage: 85, status: "green" },
        { name: "Luminosité UV", value: "1200 µW/cm²", percentage: 90, status: "blue" },
      ],
    },
    peinture: {
      id: "peinture",
      name: "Peinture",
      qualityControl: "Contrôle visuel et d'épaisseur",
      machineInfo:
        "- Pression de pulvérisation\n- Débit de peinture\n- Température cabine\n- Humidité\n- Vitesse du convoyeur",
      pieceInfo: "- Épaisseur de couche\n- Adhérence\n- Aspect visuel\n- Couleur\n- Numéro de lot",
      mesConnection: "OPC UA\n- Cabines de peinture\n- Capteurs d'humidité\n- Capteurs de température",
      controlTools: "- Jauges d'épaisseur\n- Colorimètres\n- Brillancemètres\n- Testeurs d'adhérence",
      specificMetrics: [
        {
          title: "Taux de conformité",
          value: "97.8%",
          description: "Dernières 24h",
          trend: "+0.3%",
          icon: <CheckCircle className="h-4 w-4 text-green-500" />,
          trendUp: true,
        },
        {
          title: "Productivité",
          value: "52",
          description: "pièces/heure",
          trend: "+2",
          icon: <Activity className="h-4 w-4 text-blue-500" />,
          trendUp: true,
        },
        {
          title: "Temps de séchage",
          value: "45",
          description: "minutes",
          trend: "-2min",
          icon: <Clock className="h-4 w-4 text-indigo-500" />,
          trendUp: true,
        },
        {
          title: "Consommation peinture",
          value: "92%",
          description: "Efficacité",
          trend: "+2%",
          icon: <Droplet className="h-4 w-4 text-blue-500" />,
          trendUp: true,
        },
      ],
      defectTypes: [
        { name: "Coulures", percentage: 32, color: "bg-red-500" },
        { name: "Épaisseur irrégulière", percentage: 28, color: "bg-amber-500" },
        { name: "Défauts d'aspect", percentage: 25, color: "bg-blue-500" },
        { name: "Autres", percentage: 15, color: "bg-gray-500" },
      ],
      machineParameters: [
        { name: "Pression pulvérisation", value: "4.2 bar", percentage: 85, status: "green" },
        { name: "Température cabine", value: "24°C", percentage: 80, status: "green" },
        { name: "Humidité", value: "45%", percentage: 75, status: "blue" },
        { name: "Débit peinture", value: "180 ml/min", percentage: 88, status: "amber" },
      ],
    },
    montage: {
      id: "montage",
      name: "Montage",
      qualityControl: "Test fonctionnel et contrôle visuel",
      machineInfo:
        "- Paramètres de serrage (couple)\n- Temps d'assemblage\n- Erreurs détectées\n- Séquence d'assemblage\n- Consommation d'air",
      pieceInfo:
        "- Résultats des tests fonctionnels\n- Numéro de série\n- Statut final (OK/KO)\n- Traçabilité des composants\n- Temps de cycle",
      mesConnection:
        "PLC Integration\n- Automates programmables (ex. Siemens S7)\n- Capteurs de couple (HBM)\n- Scanners code-barres",
      controlTools:
        "- Banc de test automatisé\n- Capteurs de couple connectés\n- Caméras d'inspection\n- Testeurs électriques",
      specificMetrics: [
        {
          title: "Taux de conformité",
          value: "98.5%",
          description: "Dernières 24h",
          trend: "+0.5%",
          icon: <CheckCircle className="h-4 w-4 text-green-500" />,
          trendUp: true,
        },
        {
          title: "Productivité",
          value: "32",
          description: "pièces/heure",
          trend: "+1",
          icon: <Activity className="h-4 w-4 text-blue-500" />,
          trendUp: true,
        },
        {
          title: "Temps de cycle",
          value: "112",
          description: "secondes",
          trend: "-4s",
          icon: <Clock className="h-4 w-4 text-indigo-500" />,
          trendUp: true,
        },
        {
          title: "Précision assemblage",
          value: "99.2%",
          description: "Taux de réussite",
          trend: "+0.3%",
          icon: <Tool className="h-4 w-4 text-green-500" />,
          trendUp: true,
        },
      ],
      defectTypes: [
        { name: "Assemblage incorrect", percentage: 45, color: "bg-red-500" },
        { name: "Test fonctionnel KO", percentage: 30, color: "bg-amber-500" },
        { name: "Composants manquants", percentage: 15, color: "bg-blue-500" },
        { name: "Autres", percentage: 10, color: "bg-gray-500" },
      ],
      machineParameters: [
        { name: "Couple de serrage", value: "12.5 Nm", percentage: 83, status: "green" },
        { name: "Pression pneumatique", value: "6.2 bar", percentage: 88, status: "amber" },
        { name: "Temps de cycle", value: "112 sec", percentage: 75, status: "blue" },
        { name: "Précision positionnement", value: "0.05 mm", percentage: 92, status: "green" },
      ],
    },
  }

  const atelier = atelierData[params.id]

  if (!atelier) {
    return <div>Atelier non trouvé</div>
  }

  return (
    <div className="flex min-h-screen flex-col bg-gray-50">
      <header className="sticky top-0 z-50 flex h-16 items-center gap-4 border-b bg-white px-4 shadow-sm sm:px-6">
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" className="md:hidden">
              <Menu className="h-5 w-5" />
            </Button>
            <div className="flex items-center gap-2">
              <motion.div
                initial={{ rotate: 0 }}
                animate={{ rotate: 360 }}
                transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
              >
                <Cpu className="h-6 w-6 text-cyan-500" />
              </motion.div>
              <h1 className="text-lg font-semibold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                BORDE CONSULTING
              </h1>
            </div>
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
          <div className="flex items-center gap-2">
            <Link href="/">
              <Button variant="outline" size="icon" className="rounded-full">
                <ArrowLeftCircle className="h-4 w-4" />
                <span className="sr-only">Retour</span>
              </Button>
            </Link>
            <h2 className="text-3xl font-bold tracking-tight">Atelier: {atelier.name}</h2>
          </div>
          <div className="flex items-center gap-2">
            <Button>Exporter les données</Button>
          </div>
        </div>

        <Tabs defaultValue="overview" className="space-y-4">
          <TabsList>
            <TabsTrigger value="overview">Vue d'ensemble</TabsTrigger>
            <TabsTrigger value="production">Production</TabsTrigger>
            <TabsTrigger value="quality">Qualité</TabsTrigger>
            <TabsTrigger value="machines">Machines</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              {atelier.specificMetrics.map((metric, index) => (
                <MetricCard
                  key={index}
                  title={metric.title}
                  value={metric.value}
                  description={metric.description}
                  trend={metric.trend}
                  icon={metric.icon}
                  trendUp={metric.trendUp}
                />
              ))}
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>Production journalière</CardTitle>
                  <CardDescription>Derniers 7 jours</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[200px] w-full bg-gray-100 rounded-md flex items-end justify-around p-4">
                    <div className="flex flex-col items-center">
                      <div className="bg-blue-500 w-12 rounded-t-md" style={{ height: "120px" }}></div>
                      <span className="text-xs mt-2">Lun</span>
                    </div>
                    <div className="flex flex-col items-center">
                      <div className="bg-blue-500 w-12 rounded-t-md" style={{ height: "150px" }}></div>
                      <span className="text-xs mt-2">Mar</span>
                    </div>
                    <div className="flex flex-col items-center">
                      <div className="bg-blue-500 w-12 rounded-t-md" style={{ height: "100px" }}></div>
                      <span className="text-xs mt-2">Mer</span>
                    </div>
                    <div className="flex flex-col items-center">
                      <div className="bg-blue-500 w-12 rounded-t-md" style={{ height: "180px" }}></div>
                      <span className="text-xs mt-2">Jeu</span>
                    </div>
                    <div className="flex flex-col items-center">
                      <div className="bg-blue-500 w-12 rounded-t-md" style={{ height: "140px" }}></div>
                      <span className="text-xs mt-2">Ven</span>
                    </div>
                    <div className="flex flex-col items-center">
                      <div className="bg-blue-500 w-12 rounded-t-md" style={{ height: "90px" }}></div>
                      <span className="text-xs mt-2">Sam</span>
                    </div>
                    <div className="flex flex-col items-center">
                      <div className="bg-blue-500 w-12 rounded-t-md" style={{ height: "60px" }}></div>
                      <span className="text-xs mt-2">Dim</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Répartition des défauts</CardTitle>
                  <CardDescription>Par catégorie</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {atelier.defectTypes.map((defect, index) => (
                      <div key={index}>
                        <div className="flex justify-between mb-1">
                          <span className="text-sm">{defect.name}</span>
                          <span className="text-sm font-medium">{defect.percentage}%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2.5">
                          <div
                            className={`${defect.color} h-2.5 rounded-full`}
                            style={{ width: `${defect.percentage}%` }}
                          ></div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Contrôle Qualité</CardTitle>
                  <CheckCircle className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-xl font-bold">{atelier.qualityControl}</div>
                  <p className="text-xs text-muted-foreground">Méthodes de contrôle qualité</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Info à Tracer par Machine</CardTitle>
                  <Database className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="whitespace-pre-line text-sm">{atelier.machineInfo}</div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Info à Tracer par Pièce</CardTitle>
                  <Info className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="whitespace-pre-line text-sm">{atelier.pieceInfo}</div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="production" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              <MetricCard
                title="Production totale"
                value="1,245"
                description="pièces aujourd'hui"
                trend="+5.2%"
                icon={<BarChart3 className="h-4 w-4 text-blue-500" />}
                trendUp={true}
              />
              <MetricCard
                title="Efficacité"
                value="92.3%"
                description="OEE"
                trend="+1.7%"
                icon={<Zap className="h-4 w-4 text-yellow-500" />}
                trendUp={true}
              />
              <MetricCard
                title="Temps d'arrêt"
                value="42"
                description="minutes"
                trend="-15min"
                icon={<Clock className="h-4 w-4 text-red-500" />}
                trendUp={true}
              />
              <MetricCard
                title="Opérateurs"
                value="8"
                description="actifs"
                trend="0"
                icon={<Users className="h-4 w-4 text-indigo-500" />}
                trendUp={true}
              />
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Production horaire</CardTitle>
                <CardDescription>Aujourd'hui</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px] w-full bg-gray-100 rounded-md flex items-end justify-around p-4">
                  {Array.from({ length: 12 }).map((_, i) => {
                    const height = Math.floor(Math.random() * 200) + 50
                    return (
                      <div key={i} className="flex flex-col items-center">
                        <div className="bg-blue-500 w-8 rounded-t-md" style={{ height: `${height}px` }}></div>
                        <span className="text-xs mt-2">{i + 8}h</span>
                      </div>
                    )
                  })}
                </div>
              </CardContent>
            </Card>

            <div className="grid gap-4 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>Temps de cycle</CardTitle>
                  <CardDescription>Par référence produit</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm">Réf. A1234</span>
                        <span className="text-sm font-medium">38s</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2.5">
                        <div className="bg-green-500 h-2.5 rounded-full" style={{ width: "76%" }}></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm">Réf. B5678</span>
                        <span className="text-sm font-medium">42s</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2.5">
                        <div className="bg-green-500 h-2.5 rounded-full" style={{ width: "84%" }}></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm">Réf. C9012</span>
                        <span className="text-sm font-medium">45s</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2.5">
                        <div className="bg-amber-500 h-2.5 rounded-full" style={{ width: "90%" }}></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm">Réf. D3456</span>
                        <span className="text-sm font-medium">52s</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2.5">
                        <div className="bg-red-500 h-2.5 rounded-full" style={{ width: "104%" }}></div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Causes d'arrêt</CardTitle>
                  <CardDescription>Aujourd'hui</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm">Changement d'outil</span>
                        <span className="text-sm font-medium">18 min</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2.5">
                        <div className="bg-blue-500 h-2.5 rounded-full" style={{ width: "43%" }}></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm">Panne machine</span>
                        <span className="text-sm font-medium">12 min</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2.5">
                        <div className="bg-red-500 h-2.5 rounded-full" style={{ width: "29%" }}></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm">Changement de série</span>
                        <span className="text-sm font-medium">8 min</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2.5">
                        <div className="bg-amber-500 h-2.5 rounded-full" style={{ width: "19%" }}></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm">Pause opérateur</span>
                        <span className="text-sm font-medium">4 min</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2.5">
                        <div className="bg-gray-500 h-2.5 rounded-full" style={{ width: "9%" }}></div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="quality" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              <MetricCard
                title="Taux de conformité"
                value={atelier.specificMetrics[0].value}
                description="Dernières 24h"
                trend={atelier.specificMetrics[0].trend}
                icon={<CheckCircle className="h-4 w-4 text-green-500" />}
                trendUp={atelier.specificMetrics[0].trendUp}
              />
              <MetricCard
                title="Défauts"
                value="19"
                description="pièces aujourd'hui"
                trend="-3"
                icon={<AlertTriangle className="h-4 w-4 text-amber-500" />}
                trendUp={true}
              />
              <MetricCard
                title="Retouches"
                value="12"
                description="pièces"
                trend="+2"
                icon={<Tool className="h-4 w-4 text-blue-500" />}
                trendUp={false}
              />
              <MetricCard
                title="Rebuts"
                value="7"
                description="pièces"
                trend="-5"
                icon={<AlertTriangle className="h-4 w-4 text-red-500" />}
                trendUp={true}
              />
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>Répartition des défauts</CardTitle>
                  <CardDescription>Par catégorie</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {atelier.defectTypes.map((defect, index) => (
                      <div key={index}>
                        <div className="flex justify-between mb-1">
                          <span className="text-sm">{defect.name}</span>
                          <span className="text-sm font-medium">{defect.percentage}%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2.5">
                          <div
                            className={`${defect.color} h-2.5 rounded-full`}
                            style={{ width: `${defect.percentage}%` }}
                          ></div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Évolution qualité</CardTitle>
                  <CardDescription>7 derniers jours</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[200px] w-full bg-gray-100 rounded-md p-4">
                    <div className="relative h-full w-full">
                      {/* Ligne de tendance */}
                      <div className="absolute top-0 left-0 right-0 bottom-0 flex items-center">
                        <div className="w-full h-px bg-gray-300"></div>
                      </div>

                      {/* Points de données */}
                      <div className="absolute top-[20%] left-[10%] w-3 h-3 bg-green-500 rounded-full"></div>
                      <div className="absolute top-[25%] left-[25%] w-3 h-3 bg-green-500 rounded-full"></div>
                      <div className="absolute top-[15%] left-[40%] w-3 h-3 bg-green-500 rounded-full"></div>
                      <div className="absolute top-[10%] left-[55%] w-3 h-3 bg-green-500 rounded-full"></div>
                      <div className="absolute top-[18%] left-[70%] w-3 h-3 bg-green-500 rounded-full"></div>
                      <div className="absolute top-[12%] left-[85%] w-3 h-3 bg-green-500 rounded-full"></div>

                      {/* Ligne de connexion */}
                      <svg className="absolute inset-0 w-full h-full">
                        <polyline
                          points="10%,20% 25%,25% 40%,15% 55%,10% 70%,18% 85%,12%"
                          fill="none"
                          stroke="rgb(34, 197, 94)"
                          strokeWidth="2"
                        />
                      </svg>

                      {/* Étiquettes */}
                      <div className="absolute bottom-0 left-[10%] text-xs">L</div>
                      <div className="absolute bottom-0 left-[25%] text-xs">M</div>
                      <div className="absolute bottom-0 left-[40%] text-xs">M</div>
                      <div className="absolute bottom-0 left-[55%] text-xs">J</div>
                      <div className="absolute bottom-0 left-[70%] text-xs">V</div>
                      <div className="absolute bottom-0 left-[85%] text-xs">S</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Outils de Contrôle</CardTitle>
                <CardDescription>Recommandés pour cet atelier</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="whitespace-pre-line text-sm">{atelier.controlTools}</div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="machines" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              <MetricCard
                title="Machines actives"
                value="8/10"
                description="en production"
                trend="+1"
                icon={<Cpu className="h-4 w-4 text-blue-500" />}
                trendUp={true}
              />
              <MetricCard
                title="Disponibilité"
                value="94.2%"
                description="moyenne"
                trend="+1.5%"
                icon={<Activity className="h-4 w-4 text-green-500" />}
                trendUp={true}
              />
              <MetricCard
                title="Maintenance"
                value="2"
                description="planifiées aujourd'hui"
                trend="0"
                icon={<Settings className="h-4 w-4 text-amber-500" />}
                trendUp={true}
              />
              <MetricCard
                title="Alertes"
                value="3"
                description="à traiter"
                trend="+1"
                icon={<AlertTriangle className="h-4 w-4 text-red-500" />}
                trendUp={false}
              />
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Connexion MES-Machines</CardTitle>
                <CardDescription>Configuration actuelle</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="whitespace-pre-line text-sm">{atelier.mesConnection}</div>
              </CardContent>
            </Card>

            <div className="grid gap-4 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>État des machines</CardTitle>
                  <CardDescription>Temps réel</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <div className="w-3 h-3 rounded-full bg-green-500 mr-2"></div>
                        <span>Machine 1 - {atelier.name} principal</span>
                      </div>
                      <span className="text-sm font-medium">En production</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <div className="w-3 h-3 rounded-full bg-green-500 mr-2"></div>
                        <span>Machine 2 - {atelier.name} secondaire</span>
                      </div>
                      <span className="text-sm font-medium">En production</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <div className="w-3 h-3 rounded-full bg-amber-500 mr-2"></div>
                        <span>Machine 3 - {atelier.name} spécial</span>
                      </div>
                      <span className="text-sm font-medium">Changement série</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <div className="w-3 h-3 rounded-full bg-green-500 mr-2"></div>
                        <span>Machine 4 - {atelier.name} automatique</span>
                      </div>
                      <span className="text-sm font-medium">En production</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <div className="w-3 h-3 rounded-full bg-red-500 mr-2"></div>
                        <span>Machine 5 - {atelier.name} contrôle</span>
                      </div>
                      <span className="text-sm font-medium">Maintenance</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Paramètres machine</CardTitle>
                  <CardDescription>Valeurs actuelles</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {atelier.machineParameters.map((param, index) => (
                      <div key={index}>
                        <div className="flex justify-between mb-1">
                          <span className="text-sm">{param.name}</span>
                          <span className="text-sm font-medium">{param.value}</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2.5">
                          <div
                            className={`bg-${param.status}-500 h-2.5 rounded-full`}
                            style={{ width: `${param.percentage}%` }}
                          ></div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

interface MetricCardProps {
  title: string
  value: string
  description: string
  trend: string
  icon: React.ReactNode
  trendUp: boolean
}

function MetricCard({ title, value, description, trend, icon, trendUp }: MetricCardProps) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        {icon}
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        <div className="flex items-center justify-between">
          <p className="text-xs text-muted-foreground">{description}</p>
          <div className={`flex items-center text-xs ${trendUp ? "text-green-500" : "text-red-500"}`}>{trend}</div>
        </div>
      </CardContent>
    </Card>
  )
}
