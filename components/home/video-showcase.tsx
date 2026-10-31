// Placeholder for a video showcase component,
// using an image for now until video assets are provided.
import { SectionHeading } from "@/components/home/shared";

export function VideoShowcase() {
  return (
    <section className="mx-auto max-w-7xl px-4 pt-24 sm:px-6 lg:px-8">
      <SectionHeading
        eyebrow="Community"
        title="Seen in AUR"
        sub="Real people, real fits. See how our community styles their wardrobe."
      />
      <div className="mt-8 grid grid-cols-2 gap-4 lg:grid-cols-4">
        {/* Dummy video slots */}
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="aspect-[9/16] rounded-2xl bg-card border border-line flex items-center justify-center text-soft text-sm">
            Video {i} (Coming Soon)
          </div>
        ))}
      </div>
    </section>
  );
}
