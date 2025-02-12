import {Sidebar as Side, SidebarContent, SidebarGroup, SidebarGroupContent, SidebarGroupLabel, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from "@/components/ui/sidebar"
import { Package, Home} from "lucide-react"
import Image from "next/image"
import Link from "next/link"
 


const Sidebar = () => {
    const links = [
        { title: 'Orders', url: '/dashboard', icon: Home },
        { title: 'Add Product', url: '/dashboard/addProduct' , icon: Package },
    ]
  return (
    <Side>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="mb-4"> 
            <Link href={'/'}>
                <Image src={"/logo.png"} alt={"logo"} width={100}  height={100} />
          </Link> 
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {links.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <a href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Side>
  )
}

export default Sidebar