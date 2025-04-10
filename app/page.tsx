"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Cpu, Search, BarChart3, Clock, CheckCircle2, Activity, Bell, User, Menu } from "lucide-react"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { motion } from "framer-motion"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export default function MesDashboard() {
  const [mounted, setMounted] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const [currentTime, setCurrentTime] = useState("")

  useEffect(() => {
    setMounted(true)

    const updateTime = () => {
      const now = new Date()
      setCurrentTime(now.toLocaleTimeString())
    }

    updateTime()
    const interval = setInterval(updateTime, 1000)

    return () => clearInterval(interval)
  }, [])

  const ateliers = [
    {
      id: "decolletage",
      name: "Décolletage",
      conformity: 97.2,
      productivity: 65,
      cycle: 55,
      status: "optimal",
      trend: "up",
    },
    {
      id: "fraisage",
      name: "Fraisage",
      conformity: 98.1,
      productivity: 42,
      cycle: 85,
      status: "optimal",
      trend: "stable",
    },
    {
      id: "tournage",
      name: "Tournage",
      conformity: 98.7,
      productivity: 58,
      cycle: 62,
      status: "optimal",
      trend: "up",
    },
    {
      id: "soudure",
      name: "Soudure",
      conformity: 96.5,
      productivity: 35,
      cycle: 103,
      status: "attention",
      trend: "down",
    },
    {
      id: "ressuage",
      name: "Ressuage",
      conformity: 99.3,
      productivity: 48,
      cycle: 75,
      status: "optimal",
      trend: "stable",
    },
    {
      id: "peinture",
      name: "Peinture",
      conformity: 97.8,
      productivity: 52,
      cycle: 45 * 60, // converted to seconds
      status: "optimal",
      trend: "up",
    },
    {
      id: "montage",
      name: "Montage",
      conformity: 98.5,
      productivity: 32,
      cycle: 112,
      status: "attention",
      trend: "stable",
    },
  ]

  const getStatusColor = (status) => {
    switch (status) {
      case "optimal":
        return "bg-emerald-500"
      case "attention":
        return "bg-amber-500"
      case "critical":
        return "bg-rose-500"
      default:
        return "bg-slate-500"
    }
  }

  const getTrendIcon = (trend) => {
    switch (trend) {
      case "up":
        return <span className="text-emerald-500">↑</span>
      case "down":
        return <span className="text-rose-500">↓</span>
      case "stable":
        return <span className="text-slate-500">→</span>
      default:
        return null
    }
  }

  const formatTime = (seconds) => {
    if (seconds >= 60) {
      return `${Math.floor(seconds / 60)} min`
    }
    return `${seconds} sec`
  }

  if (!mounted) return null

  return (
    <div className="flex min-h-screen flex-col bg-gradient-to-br from-slate-950 to-slate-900 text-slate-100">
      {/* Header */}
      <header className="sticky top-0 z-50 backdrop-blur-md bg-slate-900/70 border-b border-slate-800">
        <div className="container mx-auto">
          <div className="flex h-16 items-center justify-between px-4">
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

            <div className="hidden md:flex items-center space-x-1">
              <nav className="flex items-center space-x-1">
                <Button variant="ghost" className="text-slate-300 hover:text-white hover:bg-slate-800">
                  Dashboard
                </Button>
                <Button variant="ghost" className="text-slate-300 hover:text-white hover:bg-slate-800">
                  Production
                </Button>
                <Button variant="ghost" className="text-slate-300 hover:text-white hover:bg-slate-800">
                  Qualité
                </Button>
                <Button variant="ghost" className="text-slate-300 hover:text-white hover:bg-slate-800">
                  Maintenance
                </Button>
              </nav>
            </div>

            <div className="flex items-center gap-3">
              <div className="hidden md:block text-sm text-slate-400">{currentTime}</div>

              <div className="relative">
                {searchOpen ? (
                  <div className="absolute right-0 top-0 flex items-center">
                    <input
                      type="text"
                      className="w-64 h-9 rounded-md bg-slate-800 border border-slate-700 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500"
                      placeholder="Rechercher..."
                      autoFocus
                      onBlur={() => setSearchOpen(false)}
                    />
                  </div>
                ) : (
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setSearchOpen(true)}
                    className="text-slate-300 hover:text-white hover:bg-slate-800"
                  >
                    <Search className="h-5 w-5" />
                  </Button>
                )}
              </div>

              <Button
                variant="ghost"
                size="icon"
                className="text-slate-300 hover:text-white hover:bg-slate-800 relative"
              >
                <Bell className="h-5 w-5" />
                <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-cyan-500"></span>
              </Button>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="rounded-full h-8 w-8 bg-slate-800 text-slate-300 hover:text-white hover:bg-slate-700"
                  >
                    <User className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56 bg-slate-900 border-slate-800 text-slate-300">
                  <DropdownMenuLabel>Mon compte</DropdownMenuLabel>
                  <DropdownMenuSeparator className="bg-slate-800" />
                  <DropdownMenuItem className="hover:bg-slate-800 hover:text-white cursor-pointer">
                    Profil
                  </DropdownMenuItem>
                  <DropdownMenuItem className="hover:bg-slate-800 hover:text-white cursor-pointer">
                    Paramètres
                  </DropdownMenuItem>
                  <DropdownMenuSeparator className="bg-slate-800" />
                  <DropdownMenuItem className="hover:bg-slate-800 hover:text-white cursor-pointer">
                    Déconnexion
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 container mx-auto px-4 py-6">
        <div className="flex flex-col gap-6">
          {/* Dashboard Header */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h2 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-white to-slate-300 bg-clip-text text-transparent">
                Tableau de bord production
              </h2>
              <p className="text-slate-400 mt-1">Vue d'ensemble des performances des ateliers</p>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <Badge variant="outline" className="bg-slate-800 text-slate-300 hover:bg-slate-700 border-slate-700">
                Aujourd'hui
              </Badge>
              <Badge variant="outline" className="bg-slate-800 text-slate-300 hover:bg-slate-700 border-slate-700">
                Cette semaine
              </Badge>
              <Badge variant="outline" className="bg-slate-800 text-slate-300 hover:bg-slate-700 border-slate-700">
                Ce mois
              </Badge>
              <Button className="bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white border-0">
                Exporter
              </Button>
            </div>
          </div>

          {/* Stats Overview */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card className="bg-slate-800/50 backdrop-blur-sm border-slate-700 text-slate-100">
              <CardContent className="p-6">
                <div className="flex justify-between items-center">
                  <div className="space-y-1">
                    <p className="text-sm text-slate-400">Taux de conformité global</p>
                    <p className="text-2xl font-bold">97.8%</p>
                  </div>
                  <div className="h-12 w-12 rounded-full bg-emerald-500/10 flex items-center justify-center">
                    <CheckCircle2 className="h-6 w-6 text-emerald-500" />
                  </div>
                </div>
                <div className="mt-4">
                  <Progress value={97.8} className="h-1.5 bg-slate-700">
                    <div className="h-full bg-gradient-to-r from-emerald-500 to-emerald-400 rounded-full" />
                  </Progress>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-slate-800/50 backdrop-blur-sm border-slate-700 text-slate-100">
              <CardContent className="p-6">
                <div className="flex justify-between items-center">
                  <div className="space-y-1">
                    <p className="text-sm text-slate-400">Productivité moyenne</p>
                    <p className="text-2xl font-bold">
                      47.4 <span className="text-sm text-slate-400">pièces/h</span>
                    </p>
                  </div>
                  <div className="h-12 w-12 rounded-full bg-blue-500/10 flex items-center justify-center">
                    <BarChart3 className="h-6 w-6 text-blue-500" />
                  </div>
                </div>
                <div className="mt-4">
                  <Progress value={78} className="h-1.5 bg-slate-700">
                    <div className="h-full bg-gradient-to-r from-blue-500 to-blue-400 rounded-full" />
                  </Progress>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-slate-800/50 backdrop-blur-sm border-slate-700 text-slate-100">
              <CardContent className="p-6">
                <div className="flex justify-between items-center">
                  <div className="space-y-1">
                    <p className="text-sm text-slate-400">Temps de cycle moyen</p>
                    <p className="text-2xl font-bold">
                      76.7 <span className="text-sm text-slate-400">sec</span>
                    </p>
                  </div>
                  <div className="h-12 w-12 rounded-full bg-amber-500/10 flex items-center justify-center">
                    <Clock className="h-6 w-6 text-amber-500" />
                  </div>
                </div>
                <div className="mt-4">
                  <Progress value={65} className="h-1.5 bg-slate-700">
                    <div className="h-full bg-gradient-to-r from-amber-500 to-amber-400 rounded-full" />
                  </Progress>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-slate-800/50 backdrop-blur-sm border-slate-700 text-slate-100">
              <CardContent className="p-6">
                <div className="flex justify-between items-center">
                  <div className="space-y-1">
                    <p className="text-sm text-slate-400">Efficacité globale</p>
                    <p className="text-2xl font-bold">92.3%</p>
                  </div>
                  <div className="h-12 w-12 rounded-full bg-purple-500/10 flex items-center justify-center">
                    <Activity className="h-6 w-6 text-purple-500" />
                  </div>
                </div>
                <div className="mt-4">
                  <Progress value={92.3} className="h-1.5 bg-slate-700">
                    <div className="h-full bg-gradient-to-r from-purple-500 to-purple-400 rounded-full" />
                  </Progress>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Ateliers Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {ateliers.map((atelier) => (
              <Link href={`/ateliers/${atelier.id}`} key={atelier.id} className="group">
                <motion.div whileHover={{ y: -5 }} transition={{ type: "spring", stiffness: 300 }}>
                  <Card className="h-full bg-slate-800/30 backdrop-blur-sm border-slate-700 hover:bg-slate-800/50 hover:border-slate-600 transition-all duration-300 text-slate-100 overflow-hidden group-hover:shadow-lg group-hover:shadow-cyan-500/10">
                    <div className={`h-1 ${getStatusColor(atelier.status)}`}></div>
                    <CardContent className="p-6">
                      <div className="flex justify-between items-center mb-4">
                        <h3 className="text-lg font-medium">{atelier.name}</h3>
                        <div className="flex items-center gap-2">
                          <div className={`h-2.5 w-2.5 rounded-full ${getStatusColor(atelier.status)}`}></div>
                          <Cpu className="h-5 w-5 text-cyan-500" />
                        </div>
                      </div>

                      <div className="space-y-4">
                        <div>
                          <div className="flex justify-between items-center mb-1">
                            <span className="text-sm text-slate-400">Conformité</span>
                            <span className="text-sm font-medium flex items-center gap-1">
                              {atelier.conformity}% {getTrendIcon(atelier.trend)}
                            </span>
                          </div>
                          <Progress value={atelier.conformity} className="h-1 bg-slate-700">
                            <div className="h-full bg-gradient-to-r from-emerald-500 to-emerald-400 rounded-full" />
                          </Progress>
                        </div>

                        <div>
                          <div className="flex justify-between items-center mb-1">
                            <span className="text-sm text-slate-400">Productivité</span>
                            <span className="text-sm font-medium">{atelier.productivity} pièces/h</span>
                          </div>
                          <Progress value={atelier.productivity / 0.8} className="h-1 bg-slate-700">
                            <div className="h-full bg-gradient-to-r from-blue-500 to-blue-400 rounded-full" />
                          </Progress>
                        </div>

                        <div>
                          <div className="flex justify-between items-center mb-1">
                            <span className="text-sm text-slate-400">Temps de cycle</span>
                            <span className="text-sm font-medium">{formatTime(atelier.cycle)}</span>
                          </div>
                          <Progress value={100 - atelier.cycle / 2} className="h-1 bg-slate-700">
                            <div className="h-full bg-gradient-to-r from-amber-500 to-amber-400 rounded-full" />
                          </Progress>
                        </div>

                        <Button
                          variant="outline"
                          className="w-full mt-2 border-slate-700 text-slate-700 hover:bg-slate-700 hover:text-white"
                        >
                          Voir les détails
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              </Link>
            ))}
          </div>
        </div>
      </main>
    </div>
  )
}
