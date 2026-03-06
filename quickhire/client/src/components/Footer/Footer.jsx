export default function Footer() {
  return (
    <footer className="border-t mt-12">
      <div className="container mx-auto px-4 py-10">
        <div className="grid md:grid-cols-4 gap-8">
          <div>
            <h4 className="font-bold text-lg">QuickHire</h4>
            <p className="opacity-70 mt-2">
              Simple job board to find roles and apply fast.
            </p>
          </div>

          <div>
            <h5 className="font-semibold">Company</h5>
            <ul className="mt-2 space-y-2 opacity-80">
              <li>About</li>
              <li>Careers</li>
              <li>Contact</li>
            </ul>
          </div>

          <div>
            <h5 className="font-semibold">Support</h5>
            <ul className="mt-2 space-y-2 opacity-80">
              <li>Help Center</li>
              <li>Privacy</li>
              <li>Terms</li>
            </ul>
          </div>

          <div>
            <h5 className="font-semibold">Stay up to date</h5>
            <div className="mt-2 flex gap-2">
              <input
                className="input input-bordered w-full"
                placeholder="Email address"
              />
              <button className="btn btn-primary">Subscribe</button>
            </div>
          </div>
        </div>

        <p className="opacity-60 mt-8 text-sm">
          © {new Date().getFullYear()} QuickHire. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
