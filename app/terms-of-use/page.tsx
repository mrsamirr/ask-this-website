import Footer from "@/components/ui/Footer"

export const metadata = {
  title: "Terms of Use | Aurora.ai",
  description: "Terms of Use for Aurora.ai - Guidelines for using our AI services and website.",
}

export default function TermsOfUsePage() {
  return (
    <div className="bg-background min-h-screen flex flex-col">
      <main className="flex-grow container mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold mb-8">Terms of Use</h1>

        <div className="prose max-w-none">
          <p className="text-lg mb-6">Last Updated: May 4, 2025</p>

          <section className="mb-10">
            <h2 className="text-2xl font-semibold mb-4">Acceptance of Terms</h2>
            <p>
              By accessing or using Aurora.ai&apos;s website and services, you agree to be bound by these Terms of Use and
              all applicable laws and regulations. If you do not agree with any of these terms, you are prohibited from
              using or accessing this site.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-semibold mb-4">Use License</h2>
            <p className="mb-4">
              Permission is granted to temporarily access the materials on Aurora.ai&apos;s website for personal,
              non-commercial use. This is the grant of a license, not a transfer of title, and under this license you
              may not:
            </p>
            <ul className="list-disc pl-6 mb-4">
              <li>Modify or copy the materials</li>
              <li>Use the materials for any commercial purpose</li>
              <li>Attempt to decompile or reverse engineer any software contained on the website</li>
              <li>Remove any copyright or other proprietary notations from the materials</li>
              <li>Transfer the materials to another person or &apos;mirror&apos; the materials on any other server</li>
            </ul>
            <p>
              This license shall automatically terminate if you violate any of these restrictions and may be terminated
              by Aurora.ai at any time.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-semibold mb-4">AI Services</h2>
            <p className="mb-4">
              Our AI services are provided &apos;as is&apos; and are designed to assist users in various tasks. When using our AI
              services:
            </p>
            <ul className="list-disc pl-6 mb-4">
              <li>You are responsible for reviewing and verifying any output or suggestions</li>
              <li>You agree not to use our services for any illegal, harmful, or unethical purposes</li>
              <li>You understand that our AI models may not always provide accurate or complete information</li>
              <li>
                You retain ownership of your input content, but grant us license to use it for service improvement
              </li>
            </ul>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-semibold mb-4">Disclaimer</h2>
            <p>
              The materials on Aurora.ai&apos;s website and services are provided on an &apos;as is&apos; basis. Aurora.ai makes no
              warranties, expressed or implied, and hereby disclaims and negates all other warranties including, without
              limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or
              non-infringement of intellectual property or other violation of rights.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-semibold mb-4">Limitations</h2>
            <p>
              In no event shall Aurora.ai or its suppliers be liable for any damages (including, without limitation,
              damages for loss of data or profit, or due to business interruption) arising out of the use or inability
              to use Aurora.ai&apos;s materials and services, even if Aurora.ai or an authorized representative has been
              notified orally or in writing of the possibility of such damage.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-semibold mb-4">Accuracy of Materials</h2>
            <p>
              The materials appearing on Aurora.ai&apos;s website or services could include technical, typographical, or
              photographic errors. Aurora.ai does not warrant that any of the materials on its website or provided by
              its services are accurate, complete, or current. Aurora.ai may make changes to the materials contained on
              its website at any time without notice.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-semibold mb-4">Links</h2>
            <p>
              Aurora.ai has not reviewed all of the sites linked to its website and is not responsible for the contents
              of any such linked site. The inclusion of any link does not imply endorsement by Aurora.ai of the site.
              Use of any such linked website is at the user&apos;s own risk.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-semibold mb-4">Modifications</h2>
            <p>
              Aurora.ai may revise these Terms of Use for its website and services at any time without notice. By using
              this website and our services, you are agreeing to be bound by the then current version of these Terms of
              Use.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">Contact Us</h2>
            <p>
              If you have any questions about these Terms of Use, please contact us at:
              <br />
              <a href="mailto:legal@aurora.ai" className="text-blue-600 hover:underline">
                legal@aurora.ai
              </a>
            </p>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  )
}
