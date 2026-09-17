import { useState } from 'react'

const FIELDS = [
  { name: 'name', label: 'Name', type: 'text', placeholder: 'Your name', required: true },
  { name: 'email', label: 'Email', type: 'email', placeholder: 'Your email' },
  { name: 'phone', label: 'Phone Number', type: 'tel', placeholder: '(555) 555-1000' },
]

export default function Contact() {
  const [sent, setSent] = useState(false)

  // No backend here — the original posts to Framer's form handler.
  const onSubmit = (event) => {
    event.preventDefault()
    setSent(true)
  }

  return (
    <>
      <section className="relative bg-paper">
        <img
          src="https://framerusercontent.com/images/E6Gw45Xk2VqeMVk6aTxadLhT7t4.png?scale-down-to=1024"
          alt=""
          className="pointer-events-none absolute right-0 top-0 hidden h-[880px] w-[640px] object-cover lg:block"
        />

        <div className="shell relative py-16 lg:h-[880px] lg:py-0">
          <div className="max-w-[576px] lg:pt-[136px]">
            <h1 className="font-display text-[40px] font-medium leading-[44px] tracking-[-0.8px] text-ink">
              Get in Touch
            </h1>

            <p className="mt-[24px] max-w-[544px] font-body text-body-sm text-ink-3">
              Tell us about your team and what you’re trying to improve. We’ll tailor the
              demo to your programs.
            </p>

            {sent ? (
              <p className="mt-[40px] font-body text-body-sm text-sage-deep">
                Thanks — we’ll be in touch shortly.
              </p>
            ) : (
              <form onSubmit={onSubmit} className="mt-[40px] flex flex-col gap-[26px]">
                {FIELDS.map(({ name, label, type, placeholder, required }) => (
                  <label key={name} className="flex flex-col gap-3">
                    <span className="font-body text-body-sm text-ink">
                      {label}
                      {required && <span className="text-sage"> *</span>}
                    </span>
                    <input
                      name={name}
                      type={type}
                      placeholder={placeholder}
                      required={required}
                      className="h-[23px] w-full max-w-[552px] border-b border-ink/20 bg-transparent pb-2 font-body text-body-sm text-ink outline-none transition-colors duration-150 placeholder:text-muted focus:border-sage"
                    />
                  </label>
                ))}

                <label className="flex flex-col gap-3">
                  <span className="font-body text-body-sm text-ink">
                    What challenges are you looking to address
                  </span>
                  <textarea
                    name="notes"
                    rows={4}
                    placeholder="Planning, scientific tracking, FP&A"
                    className="min-h-[100px] w-full resize-y rounded-lg border border-ink/20 bg-transparent p-3 font-body text-body-sm text-ink outline-none transition-colors duration-150 placeholder:text-muted focus:border-sage"
                  />
                </label>

                <button type="submit" className="btn-mint mt-[24px] h-10 w-full">
                  Submit
                </button>
              </form>
            )}
          </div>
        </div>
      </section>
    </>
  )
}
