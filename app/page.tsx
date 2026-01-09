"use client"

import { useState } from "react"
import { Shield, FileText, Bot, Link2, Activity, TrendingUp, Users, Plus, Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { WalletConnectModal } from "@/components/wallet-connect-modal"
import { ThemeToggle } from "@/components/theme-toggle"
import { DashboardSidebar } from "@/components/dashboard-sidebar"
import { DashboardMobileNav } from "@/components/dashboard-mobile-nav"
import { ContractTemplateSelector } from "@/components/contract-template-selector"
import { ContractEditor } from "@/components/contract-editor"
import { ContractList } from "@/components/contract-list"
import { stellarService } from "@/lib/stellar-service"
import { contractService, type Contract, type ContractTemplate } from "@/lib/contract-service"

export default function HomePage() {
  const [walletConnected, setWalletConnected] = useState(false)
  const [walletAddress, setWalletAddress] = useState<string>("")
  const [network, setNetwork] = useState<string>("")
  const [showWalletModal, setShowWalletModal] = useState(false)
  const [activeSection, setActiveSection] = useState("overview")

  const [workbenchView, setWorkbenchView] = useState<"list" | "select" | "edit">("list")
  const [editingContract, setEditingContract] = useState<Contract | undefined>()
  const [contracts, setContracts] = useState<Contract[]>([])
  const [contractsView, setContractsView] = useState<"list" | "view">("list")
  const [viewingContract, setViewingContract] = useState<Contract | undefined>()

  const handleWalletConnect = (publicKey: string, networkType: string) => {
    setWalletAddress(publicKey)
    setNetwork(networkType)
    setWalletConnected(true)
  }

  const handleDisconnect = () => {
    setWalletConnected(false)
    setWalletAddress("")
    setNetwork("")
    setActiveSection("overview")
  }

  const handleStartNewContract = () => {
    setWorkbenchView("select")
  }

  const handleSelectTemplate = (template: ContractTemplate) => {
    const newContract = contractService.createContract(
      template.name,
      template.content,
      template.category,
      "international",
      [],
    )
    setEditingContract(newContract)
    setWorkbenchView("edit")
  }

  const handleStartBlank = () => {
    setEditingContract(undefined)
    setWorkbenchView("edit")
  }

  const handleSaveContract = (contract: Contract) => {
    setContracts(contractService.getContracts())
    setWorkbenchView("list")
    setEditingContract(undefined)
    setActiveSection("contracts")
  }

  const handleCancelEdit = () => {
    setWorkbenchView("list")
    setEditingContract(undefined)
  }

  const handleViewContract = (contract: Contract) => {
    setViewingContract(contract)
    setContractsView("view")
  }

  const handleEditContract = (contract: Contract) => {
    setEditingContract(contract)
    setActiveSection("workbench")
    setWorkbenchView("edit")
  }

  const handleDeleteContract = (contract: Contract) => {
    if (confirm(`Are you sure you want to delete "${contract.title}"?`)) {
      contractService.deleteContract(contract.id)
      setContracts(contractService.getContracts())
    }
  }

  if (!walletConnected) {
    return (
      <div className="min-h-screen bg-background">
        {/* Navigation */}
        <nav className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="flex items-center justify-between h-16">
              <div className="flex items-center gap-2">
                <Shield className="h-7 w-7 text-primary" />
                <span className="font-semibold text-xl text-foreground">Nexus-Shield</span>
              </div>

              <div className="hidden md:flex items-center gap-6">
                <a href="#features" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Features
                </a>
                <a
                  href="#how-it-works"
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  How It Works
                </a>
                <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Docs
                </a>
                <ThemeToggle />
                <Button onClick={() => setShowWalletModal(true)} className="bg-primary hover:bg-primary/90">
                  Connect Wallet
                </Button>
              </div>

              <div className="md:hidden flex items-center gap-2">
                <ThemeToggle />
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setShowWalletModal(true)}
                  className="hover:bg-accent"
                >
                  <Shield className="h-5 w-5" />
                </Button>
              </div>
            </div>
          </div>
        </nav>

        {/* Hero Section */}
        <section className="py-20 lg:py-32">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="max-w-4xl mx-auto text-center space-y-8">
              <Badge variant="secondary" className="text-sm px-4 py-1">
                Powered by Stellar Blockchain
              </Badge>
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight text-balance">
                Secure. Intelligent. <span className="text-primary">Borderless</span> Contract Management.
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto text-pretty">
                Next-generation Contract Lifecycle Management platform designed to simplify international legal
                workflows with AI and blockchain technology.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
                <Button
                  size="lg"
                  onClick={() => setShowWalletModal(true)}
                  className="bg-primary hover:bg-primary/90 text-lg h-12 px-8"
                >
                  Connect Stellar Wallet
                </Button>
                <Button size="lg" variant="outline" className="text-lg h-12 px-8 bg-transparent">
                  Learn More
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Features Grid */}
        <section id="features" className="py-20 bg-muted/30">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Why Nexus-Shield?</h2>
              <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                Everything you need for global contract management in one secure platform
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card className="border-border bg-card hover:shadow-lg transition-shadow">
                <CardHeader>
                  <FileText className="h-10 w-10 text-primary mb-2" />
                  <CardTitle className="text-lg">Collaborative Workbench</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="leading-relaxed">
                    Draft, review, and negotiate contracts together in a unified workspace
                  </CardDescription>
                </CardContent>
              </Card>

              <Card className="border-border bg-card hover:shadow-lg transition-shadow">
                <CardHeader>
                  <Bot className="h-10 w-10 text-accent mb-2" />
                  <CardTitle className="text-lg">AI Risk Analysis</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="leading-relaxed">
                    Detect legal risks and compliance issues with intelligent AI scanning
                  </CardDescription>
                </CardContent>
              </Card>

              <Card className="border-border bg-card hover:shadow-lg transition-shadow">
                <CardHeader>
                  <Link2 className="h-10 w-10 text-chart-2 mb-2" />
                  <CardTitle className="text-lg">Blockchain Security</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="leading-relaxed">
                    Cryptographic fingerprints anchored on Stellar ensure authenticity
                  </CardDescription>
                </CardContent>
              </Card>

              <Card className="border-border bg-card hover:shadow-lg transition-shadow">
                <CardHeader>
                  <Activity className="h-10 w-10 text-chart-4 mb-2" />
                  <CardTitle className="text-lg">Immutable Audit Trails</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="leading-relaxed">
                    Every action is recorded, time-stamped, and fully transparent
                  </CardDescription>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section id="how-it-works" className="py-20">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">How Nexus-Shield Works</h2>
            </div>

            <div className="max-w-4xl mx-auto space-y-8">
              {[
                {
                  number: "01",
                  title: "Collaborative Contract Workbench",
                  description:
                    "Teams draft, review, and negotiate contracts together in a single online workspace, eliminating email chaos and version confusion.",
                },
                {
                  number: "02",
                  title: "AI-Powered Risk Analysis",
                  description:
                    "Built-in AI scans contracts to detect legal risks, highlight missing or weak clauses, and flag cross-border compliance issues.",
                },
                {
                  number: "03",
                  title: "Blockchain-Backed Trust",
                  description:
                    "Cryptographic fingerprints anchored on Stellar blockchain ensure proof of authenticity and protection against tampering.",
                },
                {
                  number: "04",
                  title: "Smart Contract Audit Trails",
                  description:
                    "Using Stellar Soroban, every action is automatically recorded, time-stamped, and made fully transparent and immutable.",
                },
              ].map((step) => (
                <Card key={step.number} className="border-border bg-card">
                  <CardHeader>
                    <div className="flex items-start gap-4">
                      <div className="text-4xl font-bold text-primary/20">{step.number}</div>
                      <div className="flex-1">
                        <CardTitle className="text-xl mb-2">{step.title}</CardTitle>
                        <CardDescription className="text-base leading-relaxed">{step.description}</CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-20 bg-primary text-primary-foreground">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
              <div>
                <TrendingUp className="h-10 w-10 mx-auto mb-4 opacity-90" />
                <div className="text-4xl font-bold mb-2">Fast & Secure</div>
                <div className="text-primary-foreground/80">Low-cost blockchain verification</div>
              </div>
              <div>
                <Users className="h-10 w-10 mx-auto mb-4 opacity-90" />
                <div className="text-4xl font-bold mb-2">Real-time</div>
                <div className="text-primary-foreground/80">Collaborative workflows</div>
              </div>
              <div>
                <Shield className="h-10 w-10 mx-auto mb-4 opacity-90" />
                <div className="text-4xl font-bold mb-2">AI-Driven</div>
                <div className="text-primary-foreground/80">Legal intelligence</div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20">
          <div className="container mx-auto px-4 lg:px-8">
            <Card className="border-border bg-card max-w-3xl mx-auto text-center">
              <CardHeader className="space-y-4 pb-8 pt-12">
                <CardTitle className="text-3xl md:text-4xl">Ready to Get Started?</CardTitle>
                <CardDescription className="text-lg">
                  Connect your Stellar wallet to access the Nexus-Shield platform
                </CardDescription>
              </CardHeader>
              <CardContent className="pb-12">
                <Button
                  size="lg"
                  onClick={() => setShowWalletModal(true)}
                  className="bg-primary hover:bg-primary/90 text-lg h-12 px-8"
                >
                  Connect Stellar Wallet
                </Button>
              </CardContent>
            </Card>
          </div>
        </section>

        <WalletConnectModal open={showWalletModal} onOpenChange={setShowWalletModal} onConnect={handleWalletConnect} />
      </div>
    )
  }

  // Dashboard view (shown after wallet is connected)
  return (
    <div className="min-h-screen bg-background">
      {/* Dashboard Navigation */}
      <nav className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-4">
              <DashboardMobileNav activeSection={activeSection} onSectionChange={setActiveSection} />
              <div className="flex items-center gap-2">
                <Shield className="h-6 w-6 text-primary" />
                <span className="font-semibold text-lg text-foreground">Nexus-Shield</span>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Badge variant="secondary" className="hidden sm:inline-flex text-xs">
                {network === "TESTNET" ? "Testnet" : network}
              </Badge>
              <Badge variant="outline" className="font-mono text-xs hidden sm:inline-flex">
                {stellarService.shortenAddress(walletAddress)}
              </Badge>
              <ThemeToggle />
              <Button
                variant="outline"
                size="sm"
                onClick={handleDisconnect}
                className="hidden sm:inline-flex bg-transparent"
              >
                Disconnect
              </Button>
            </div>
          </div>
        </div>
      </nav>

      <div className="flex">
        <DashboardSidebar activeSection={activeSection} onSectionChange={setActiveSection} />

        {/* Main Content Area */}
        <main className="flex-1 p-4 lg:p-8">
          {activeSection === "overview" && (
            <div className="space-y-8">
              <div>
                <h1 className="text-3xl font-bold mb-2">Dashboard Overview</h1>
                <p className="text-muted-foreground">Monitor your contract lifecycle at a glance</p>
              </div>

              {/* Stats Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <Card className="border-border">
                  <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <CardTitle className="text-sm font-medium">Active Contracts</CardTitle>
                    <FileText className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{contracts.length}</div>
                    <p className="text-xs text-muted-foreground mt-1">
                      {contracts.length === 0 ? "No active contracts" : "Total contracts"}
                    </p>
                  </CardContent>
                </Card>

                <Card className="border-border">
                  <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <CardTitle className="text-sm font-medium">AI Scans Completed</CardTitle>
                    <Bot className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">0</div>
                    <p className="text-xs text-muted-foreground mt-1">Ready to analyze</p>
                  </CardContent>
                </Card>

                <Card className="border-border">
                  <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <CardTitle className="text-sm font-medium">Blockchain Anchors</CardTitle>
                    <Link2 className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">0</div>
                    <p className="text-xs text-muted-foreground mt-1">On Stellar network</p>
                  </CardContent>
                </Card>

                <Card className="border-border">
                  <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <CardTitle className="text-sm font-medium">Audit Events</CardTitle>
                    <Activity className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">0</div>
                    <p className="text-xs text-muted-foreground mt-1">All actions tracked</p>
                  </CardContent>
                </Card>
              </div>

              {/* Quick Actions */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card className="border-border">
                  <CardHeader>
                    <CardTitle>Quick Actions</CardTitle>
                    <CardDescription>Get started with common tasks</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <Button
                      onClick={() => {
                        setActiveSection("workbench")
                        setWorkbenchView("select")
                      }}
                      className="w-full justify-start bg-primary hover:bg-primary/90"
                    >
                      <Plus className="h-4 w-4 mr-2" />
                      Create New Contract
                    </Button>
                    <Button
                      onClick={() => setActiveSection("ai-analysis")}
                      variant="outline"
                      className="w-full justify-start"
                    >
                      <Bot className="h-4 w-4 mr-2" />
                      Run AI Analysis
                    </Button>
                    <Button
                      onClick={() => setActiveSection("blockchain")}
                      variant="outline"
                      className="w-full justify-start"
                    >
                      <Link2 className="h-4 w-4 mr-2" />
                      Verify on Blockchain
                    </Button>
                  </CardContent>
                </Card>

                <Card className="border-border">
                  <CardHeader>
                    <CardTitle>Recent Activity</CardTitle>
                    <CardDescription>Latest updates and actions</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="text-center py-8 text-muted-foreground">
                      <Activity className="h-8 w-8 mx-auto mb-2 opacity-50" />
                      <p className="text-sm">No recent activity</p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          )}

          {activeSection === "contracts" && (
            <div className="space-y-6">
              {contractsView === "list" ? (
                <>
                  <div className="flex items-center justify-between">
                    <div>
                      <h1 className="text-3xl font-bold mb-2">Contracts</h1>
                      <p className="text-muted-foreground">Manage all your cross-border contracts</p>
                    </div>
                    <Button
                      onClick={() => {
                        setActiveSection("workbench")
                        setWorkbenchView("select")
                      }}
                      className="bg-primary hover:bg-primary/90"
                    >
                      <Plus className="h-4 w-4 mr-2" />
                      New Contract
                    </Button>
                  </div>

                  <div className="flex gap-4">
                    <div className="relative flex-1">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input placeholder="Search contracts..." className="pl-10" />
                    </div>
                    <Button variant="outline">Filter</Button>
                  </div>

                  <ContractList
                    contracts={contracts}
                    onView={handleViewContract}
                    onEdit={handleEditContract}
                    onDelete={handleDeleteContract}
                  />
                </>
              ) : (
                <div className="space-y-6">
                  <Button variant="outline" onClick={() => setContractsView("list")}>
                    ← Back to List
                  </Button>
                  <Card className="border-border">
                    <CardHeader>
                      <CardTitle>{viewingContract?.title}</CardTitle>
                      <div className="flex gap-2 mt-2">
                        <Badge variant="outline">{viewingContract?.type}</Badge>
                        <Badge variant="outline">{viewingContract?.jurisdiction}</Badge>
                        <Badge>{viewingContract?.status}</Badge>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="whitespace-pre-wrap font-mono text-sm bg-muted/30 p-6 rounded-lg">
                        {viewingContract?.content}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              )}
            </div>
          )}

          {activeSection === "workbench" && (
            <div className="space-y-6">
              {workbenchView === "list" && (
                <>
                  <div className="flex items-center justify-between">
                    <div>
                      <h1 className="text-3xl font-bold mb-2">Contract Workbench</h1>
                      <p className="text-muted-foreground">Collaborative space for drafting and reviewing contracts</p>
                    </div>
                    <Button onClick={handleStartNewContract} className="bg-primary hover:bg-primary/90">
                      <Plus className="h-4 w-4 mr-2" />
                      New Contract
                    </Button>
                  </div>

                  <Card className="border-border">
                    <CardContent className="py-16 text-center">
                      <FileText className="h-12 w-12 mx-auto mb-4 text-primary opacity-50" />
                      <h3 className="text-lg font-semibold mb-2">Start Creating Contracts</h3>
                      <p className="text-muted-foreground mb-6">
                        Use templates or start from scratch to create professional contracts
                      </p>
                      <Button onClick={handleStartNewContract} className="bg-primary hover:bg-primary/90">
                        <Plus className="h-4 w-4 mr-2" />
                        Create Your First Contract
                      </Button>
                    </CardContent>
                  </Card>
                </>
              )}

              {workbenchView === "select" && (
                <>
                  <Button variant="outline" onClick={() => setWorkbenchView("list")}>
                    ← Back
                  </Button>
                  <ContractTemplateSelector onSelectTemplate={handleSelectTemplate} onStartBlank={handleStartBlank} />
                </>
              )}

              {workbenchView === "edit" && (
                <>
                  <div className="flex items-center justify-between">
                    <h1 className="text-3xl font-bold">{editingContract ? "Edit Contract" : "Create New Contract"}</h1>
                  </div>
                  <ContractEditor
                    initialContract={editingContract}
                    onSave={handleSaveContract}
                    onCancel={handleCancelEdit}
                  />
                </>
              )}
            </div>
          )}

          {activeSection === "ai-analysis" && (
            <div className="space-y-6">
              <div>
                <h1 className="text-3xl font-bold mb-2">AI Risk Analysis</h1>
                <p className="text-muted-foreground">AI-powered contract analysis and compliance checking</p>
              </div>

              <Card className="border-border bg-gradient-to-br from-accent/10 to-primary/10">
                <CardHeader>
                  <CardTitle className="text-2xl">Coming Soon</CardTitle>
                  <CardDescription className="text-base">AI-powered legal intelligence features</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4">This feature will include:</p>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li className="flex items-center gap-2">
                      <div className="h-1.5 w-1.5 rounded-full bg-accent" />
                      Automated risk detection
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="h-1.5 w-1.5 rounded-full bg-accent" />
                      Missing clause identification
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="h-1.5 w-1.5 rounded-full bg-accent" />
                      Cross-border compliance checks
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="h-1.5 w-1.5 rounded-full bg-accent" />
                      Legal terminology analysis
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          )}

          {activeSection === "blockchain" && (
            <div className="space-y-6">
              <div>
                <h1 className="text-3xl font-bold mb-2">Blockchain Verification</h1>
                <p className="text-muted-foreground">Anchor contract fingerprints on Stellar blockchain</p>
              </div>

              <Card className="border-border bg-gradient-to-br from-chart-2/10 to-primary/10">
                <CardHeader>
                  <CardTitle className="text-2xl">Coming Soon</CardTitle>
                  <CardDescription className="text-base">Blockchain verification and anchoring</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4">This feature will include:</p>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li className="flex items-center gap-2">
                      <div className="h-1.5 w-1.5 rounded-full bg-chart-2" />
                      Cryptographic fingerprint generation
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="h-1.5 w-1.5 rounded-full bg-chart-2" />
                      Stellar blockchain anchoring
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="h-1.5 w-1.5 rounded-full bg-chart-2" />
                      Tamper-proof verification
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="h-1.5 w-1.5 rounded-full bg-chart-2" />
                      Public verification links
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          )}

          {activeSection === "audit-trail" && (
            <div className="space-y-6">
              <div>
                <h1 className="text-3xl font-bold mb-2">Audit Trail</h1>
                <p className="text-muted-foreground">Immutable record of all contract actions</p>
              </div>

              <Card className="border-border">
                <CardContent className="py-16 text-center">
                  <Activity className="h-12 w-12 mx-auto mb-4 text-muted-foreground opacity-50" />
                  <h3 className="text-lg font-semibold mb-2">No audit events yet</h3>
                  <p className="text-muted-foreground">All contract actions will be tracked here</p>
                </CardContent>
              </Card>
            </div>
          )}

          {activeSection === "team" && (
            <div className="space-y-6">
              <div>
                <h1 className="text-3xl font-bold mb-2">Team Management</h1>
                <p className="text-muted-foreground">Manage team members and permissions</p>
              </div>

              <Card className="border-border">
                <CardContent className="py-16 text-center">
                  <Users className="h-12 w-12 mx-auto mb-4 text-muted-foreground opacity-50" />
                  <h3 className="text-lg font-semibold mb-2">Team feature coming soon</h3>
                  <p className="text-muted-foreground">Invite team members and manage collaboration</p>
                </CardContent>
              </Card>
            </div>
          )}

          {activeSection === "settings" && (
            <div className="space-y-6">
              <div>
                <h1 className="text-3xl font-bold mb-2">Settings</h1>
                <p className="text-muted-foreground">Configure your Nexus-Shield account</p>
              </div>

              <Card className="border-border">
                <CardHeader>
                  <CardTitle>Wallet Connection</CardTitle>
                  <CardDescription>Your connected Stellar wallet</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between p-4 rounded-lg bg-muted/50">
                    <div>
                      <p className="text-sm font-medium mb-1">Connected Address</p>
                      <p className="text-xs text-muted-foreground font-mono">{walletAddress}</p>
                    </div>
                    <Badge variant="secondary">{network === "TESTNET" ? "Testnet" : network}</Badge>
                  </div>
                  <Button variant="destructive" onClick={handleDisconnect}>
                    Disconnect Wallet
                  </Button>
                </CardContent>
              </Card>
            </div>
          )}
        </main>
      </div>
    </div>
  )
}
