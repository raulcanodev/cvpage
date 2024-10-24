import { toast } from 'sonner'

export async function handleCheckout(email: string, userId: string) {
  console.log("email", email);
  console.log("userId", userId);
  
  
  try {
    const res = await fetch('/api/checkout', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, user_id: userId }),
    })

    if (res.ok) {
      const data = await res.json()
      return data.checkoutUrl
    } else {
      const data = await res.json()
      toast.error(data.message)
      return null
    }
  } catch (error) {
    console.error('Error creating checkout:', error)
    toast.error('An error occurred while creating the checkout.')
    return null
  }
}