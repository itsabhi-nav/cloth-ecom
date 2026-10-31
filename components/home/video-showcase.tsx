"use client";

import { useEffect, useRef } from "react";
import { SectionHeading } from "@/components/home/shared";

export function VideoShowcase() {
  const videoFiles = [
    "/video/gemini_generated_video_AFC05CC4.MP4",
    "/video/gemini_generated_video_C6BAB337.MP4",
  ];

  const videos = [
    { url: videoFiles[0], caption: "Essential Heavyweight Tee in motion" },
    { url: videoFiles[1], caption: "Bias Slip Dress, natural light" },
    { url: videoFiles[0], caption: "Cloud Fleece Hoodie + wide denim" },
    { url: videoFiles[1], caption: "Court Low Sneakers, daily wear" },
  ];

  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);

  useEffect(() => {
    // Attempt autoplay immediately and continue retrying
    const attemptPlay = () => {
      videoRefs.current.forEach((video) => {
        if (video && video.paused) {
          video.muted = true; // Crucial for auto-play
          video.play().catch((err) => console.log("Autoplay blocked", err));
        }
      });
    };

    attemptPlay(); // Initial attempt

    const interval = setInterval(attemptPlay, 1000);
    return () => clearInterval(interval);
  }, []);

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
              ref={(el) => { videoRefs.current[i] = el; }}
              src={v.url}
              autoPlay
              muted
              loop
              playsInline
              preload="auto"
              className="h-full w-full object-cover"
            />
            <div className="absolute bottom-0 left-0 right-0 p-3 bg-linear-to-t from-black/80 to-transparent text-white text-xs font-medium">
              {v.caption}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
