import * as React from 'react'
import { useFormStatus } from 'react-dom'
import { Slot } from '@radix-ui/react-slot'
import { type VariantProps } from 'class-variance-authority'

import { cn } from '@/lib/utils'
import { buttonVariants } from '@/components/ui/Button'

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
  pendingText: string | React.ReactNode
}

const FormButton = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant,
      size,
      children,
      pendingText,
      asChild = false,
      ...props
    },
    ref
  ) => {
    const { pending } = useFormStatus()
    const Comp = asChild ? Slot : 'button'

    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        disabled={pending || props.disabled}
        ref={ref}
        {...props}
      >
        {pending ? pendingText : children}
      </Comp>
    )
  }
)

FormButton.displayName = 'FormButton'

export default FormButton
