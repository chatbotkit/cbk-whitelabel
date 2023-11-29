import * as React from 'react'
import { useFormStatus } from 'react-dom'
import { Slot } from '@radix-ui/react-slot'

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  asChild?: boolean
  pendingState: string | React.ReactNode
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
        className={className}
        disabled={pending || props.disabled}
        ref={ref}
        {...props}
      >
        {pending ? pendingState : children}
      </Comp>
    )
  }
)

FormButton.displayName = 'FormButton'
