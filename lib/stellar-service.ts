// Stellar wallet service for Freighter integration
export interface FreighterApi {
  isConnected: () => Promise<boolean>
  getPublicKey: () => Promise<string>
  signTransaction: (xdr: string, opts?: { network?: string; networkPassphrase?: string }) => Promise<string>
  getNetwork: () => Promise<string>
  isAllowed: () => Promise<boolean>
  setAllowed: () => Promise<void>
}

declare global {
  interface Window {
    freighterApi?: FreighterApi
  }
}

export type WalletType = "freighter" | "albedo" | "xbull" | "ledger" | "lobstr" | "rabet" | "hana"

export interface WalletInfo {
  id: WalletType
  name: string
  icon: string
  enabled: boolean
  description: string
}

export const SUPPORTED_WALLETS: WalletInfo[] = [
  {
    id: "freighter",
    name: "Freighter",
    icon: "🚀",
    enabled: true,
    description: "Chrome Extension",
  },
  {
    id: "albedo",
    name: "Albedo",
    icon: "⭐",
    enabled: true,
    description: "Web-based Wallet",
  },
  {
    id: "xbull",
    name: "xBull",
    icon: "🐂",
    enabled: true,
    description: "Multi-platform Wallet",
  },
  {
    id: "ledger",
    name: "Ledger",
    icon: "🔐",
    enabled: true,
    description: "Hardware Wallet",
  },
  {
    id: "lobstr",
    name: "LOBSTR",
    icon: "🦞",
    enabled: false,
    description: "Not Available",
  },
  {
    id: "rabet",
    name: "Rabet",
    icon: "🐰",
    enabled: false,
    description: "Not Available",
  },
  {
    id: "hana",
    name: "Hana Wallet",
    icon: "🌸",
    enabled: false,
    description: "Not Available",
  },
]

export class StellarWalletService {
  private static instance: StellarWalletService

  private constructor() {}

  static getInstance(): StellarWalletService {
    if (!StellarWalletService.instance) {
      StellarWalletService.instance = new StellarWalletService()
    }
    return StellarWalletService.instance
  }

  async isFreighterInstalled(): Promise<boolean> {
    return typeof window !== "undefined" && typeof window.freighterApi !== "undefined"
  }

  async connectFreighter(): Promise<{ publicKey: string; network: string }> {
    if (typeof window === "undefined") {
      throw new Error("Window is not defined")
    }

    if (!window.freighterApi) {
      throw new Error("Freighter wallet is not installed. Please install the Freighter browser extension.")
    }

    try {
      // Check if already allowed
      const isAllowed = await window.freighterApi.isAllowed()

      if (!isAllowed) {
        // Request permission
        await window.freighterApi.setAllowed()
      }

      // Get public key
      const publicKey = await window.freighterApi.getPublicKey()

      // Get network (should be testnet for this project)
      const network = await window.freighterApi.getNetwork()

      return { publicKey, network }
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(`Failed to connect to Freighter: ${error.message}`)
      }
      throw new Error("Failed to connect to Freighter: Unknown error")
    }
  }

  shortenAddress(address: string): string {
    if (!address || address.length < 12) return address
    return `${address.slice(0, 4)}...${address.slice(-4)}`
  }

  async connectWallet(walletType: WalletType): Promise<{ publicKey: string; network: string }> {
    switch (walletType) {
      case "freighter":
        return this.connectFreighter()
      case "albedo":
        throw new Error("Albedo wallet integration coming soon")
      case "xbull":
        throw new Error("xBull wallet integration coming soon")
      case "ledger":
        throw new Error("Ledger wallet integration coming soon")
      default:
        throw new Error(`Wallet ${walletType} is not available`)
    }
  }
}

export const stellarService = StellarWalletService.getInstance()
