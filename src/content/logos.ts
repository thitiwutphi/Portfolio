export interface Logo {
  /** Path inside public/, without a leading slash. */
  src: string
  alt: string
  /** Intrinsic size, used for the aspect ratio. */
  width: number
  height: number
}

// Official logos from each organization's website (arv.co.th, pim.ac.th, rmagroup.com,
// gosoft.co.th) and the Java logo from Wikimedia Commons. RMA publishes a white logo, so it is
// tinted navy to show on the white logo tile.
export const logos = {
  arv: { src: 'images/logos/arv.webp', alt: 'AI and Robotics Ventures', width: 172, height: 69 },
  pim: {
    src: 'images/logos/pim.webp',
    alt: 'Panyapiwat Institute of Management',
    width: 112,
    height: 104,
  },
  rma: { src: 'images/logos/rma.webp', alt: 'RMA Group', width: 400, height: 104 },
  gosoft: { src: 'images/logos/gosoft.webp', alt: 'Gosoft (Thailand)', width: 161, height: 30 },
  java: { src: 'images/logos/java.svg', alt: 'Java', width: 300, height: 550 },
} satisfies Record<string, Logo>
