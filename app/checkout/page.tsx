export default function Checkout(){
  return (
    <div className="mx-auto max-w-3xl p-4">
      <h1 className="text-2xl font-semibold">Checkout</h1>
      <p className="mt-2">This is a demo checkout. No real payment is processed.</p>
      <form className="mt-4">
        <div className="grid grid-cols-1 gap-2">
          <input placeholder="Full name" className="border px-2 py-1" />
          <input placeholder="Address" className="border px-2 py-1" />
          <button className="px-4 py-2 bg-blue-600 text-white rounded mt-2">Place order</button>
        </div>
      </form>
    </div>
  )
}
