import { useI18n } from "@/i18n";
import { LoopCarousel } from "@/components/site/LoopCarousel";
import { PhotoSlot } from "@/components/site/PhotoSlot";
import { Reveal } from "@/components/site/Reveal";
import { YUMA_PHOTOS } from "@/lib/site";

/** Yuma page: the Yuma photos in the shared endless carousel, below the border map. */
export function YumaPhotos() {
  const { t } = useI18n();
  const w = t.threepl.whyYuma;

  return (
    <section aria-label={w.photos.region} className="relative bg-white">
      <div className="container-wdf py-16 md:py-20">
        <Reveal>
          <LoopCarousel
            id="yuma-photos"
            items={YUMA_PHOTOS.map((photo) => ({
              key: photo.src,
              node: (
                <PhotoSlot
                  photo={photo}
                  className="aspect-[4/3] rounded-md shadow-[0_20px_50px_-20px_rgb(12_24_40/0.5)]"
                  imgClassName="pointer-events-none select-none"
                />
              ),
            }))}
            label={w.photos.region}
            previous={w.photos.previous}
            next={w.photos.next}
            tileClassName="w-[85%] sm:w-[60%] lg:w-[calc((100%-3rem)/3)]"
            thumbClassName="bg-accent"
            captioned={false}
          />
        </Reveal>
      </div>
    </section>
  );
}
