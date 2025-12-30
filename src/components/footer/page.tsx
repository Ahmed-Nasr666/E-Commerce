import Link from "next/link"
import { Mail, MapPin, Phone } from "lucide-react"

export default function Footer() {
  return (
    <footer className="border-t bg-white mt-5">
      <div className="container mx-auto px-6 py-14">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-6">
          
         
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div className="flex h-8 w-8 items-center justify-center rounded bg-black text-white font-bold">
                S
              </div>
              <span className="text-lg font-semibold">ShopMart</span>
            </div>
            <p className="text-sm text-muted-foreground mb-6 max-w-sm">
              Your one-stop destination for the latest technology, fashion, and
              lifestyle products. Quality guaranteed with fast shipping and
              excellent customer service.
            </p>

            <ul className="space-y-3 text-sm text-muted-foreground">
              <li className="flex items-center gap-2">
                <MapPin className="h-4 w-4" />
                123 Shop Street, October City, DC 12345
              </li>
              <li className="flex items-center gap-2">
                <Phone className="h-4 w-4" />
                (+20) 01093333333
              </li>
              <li className="flex items-center gap-2">
                <Mail className="h-4 w-4" />
                support@shopmart.com
              </li>
            </ul>
          </div>


          <div>
            <h4 className="mb-4 font-semibold">SHOP</h4>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li><Link href="#">Electronics</Link></li>
              <li><Link href="#">Fashion</Link></li>
              <li><Link href="#">Home & Garden</Link></li>
              <li><Link href="#">Sports</Link></li>
              <li><Link href="#">Deals</Link></li>
            </ul>
          </div>

 
          <div>
            <h4 className="mb-4 font-semibold">CUSTOMER SERVICE</h4>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li><Link href="#">Contact Us</Link></li>
              <li><Link href="#">Help Center</Link></li>
              <li><Link href="#">Track Your Order</Link></li>
              <li><Link href="#">Returns & Exchanges</Link></li>
              <li><Link href="#">Size Guide</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="mb-4 font-semibold">ABOUT</h4>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li><Link href="#">About Shopmart</Link></li>
              <li><Link href="#">Careers</Link></li>
              <li><Link href="#">Press</Link></li>
              <li><Link href="#">Investor Relations</Link></li>
              <li><Link href="#">Sustainability</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="mb-4 font-semibold">POLICIES</h4>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li><Link href="#">Privacy Policy</Link></li>
              <li><Link href="#">Terms of Service</Link></li>
              <li><Link href="#">Cookie Policy</Link></li>
              <li><Link href="#">Shipping Policy</Link></li>
              <li><Link href="#">Refund Policy</Link></li>
            </ul>
          </div>
        </div>
      </div>

      <div className="border-t py-4 text-center text-sm text-muted-foreground">
        © {new Date().getFullYear()} ShopMart. All rights reserved.
      </div>
    </footer>
  )
}

