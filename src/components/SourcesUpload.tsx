import {
  HomeIcon,
  ChatBubbleOvalLeftIcon,
  FingerPrintIcon,
  CircleStackIcon,
  CubeIcon,
} from '@heroicons/react/20/solid'
import { ShieldCheckIcon } from '@heroicons/react/24/outline'

type LinkType = {
  href: string
  description: string
  title: string
  icon: any
  upcomming: boolean
}

export const navLinksMain: LinkType[] = [
  {
    title: 'General',
    description: 'Find all your metrics in the home tab',
    href: '/dashboard',
    icon: CubeIcon,
    upcomming: false,
  },
  {
    title: 'Sources',
    description: 'Create custom datasets for your fine-tuning jobs.',
    href: '/dashboard/datasets',
    icon: CircleStackIcon,
    upcomming: false,
  },
]

export default function Settings() {
  return (
    <div className="rounded-lg border border-zinc-200 p-4 bg-white">
      <div className="grid-cols-1">
        <h1>General</h1>
      </div>
    </div>
  )
}
