import { SectionHeading } from "@/components/home/shared";

export function VideoShowcase() {
  const videos = [
    {
      url: "https://videos.pexels.com/video-files/4211100/4211100-sd_506_960_25fps.mp4",
      caption: "Essential Heavyweight Tee in motion",
    },
    {
      url: "https://videos.pexels.com/video-files/5980312/5980312-sd_506_960_25fps.mp4",
      caption: "Bias Slip Dress, natural light",
    },
    {
      url: "https://videos.pexels.com/video-files/5799797/5799797-sd_506_960_25fps.mp4",
      caption: "Cloud Fleece Hoodie + wide denim",
    },
    {
      url: "https://videos.pexels.com/video-files/4938472/4938472-sd_506_960_25fps.mp4",
      caption: "Court Low Sneakers, daily wear",
    },
  ];

  return (
    <section className="mx-auto max-w-7xl px-4 pt-24 sm:px-6 lg:px-8">
      <SectionHeading
        eyebrow="Community"
        title="Seen in AUR"
        sub="Real people, real fits. See how our community styles their wardrobe."
      />
      <div className="mt-8 grid grid-cols-2 gap-4 lg:grid-cols-4">
        {videos.map((v, i) => (
          <div key={i} className="aspect-9/16 rounded-2xl overflow-hidden bg-card border border-line relative">
            <video
              src={v.url}
              autoPlay
              muted
              loop
              playsInline
              className="h-full w-full object-cover"
            />
            <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/80 to-transparent text-white text-xs font-medium">
              {v.caption}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
