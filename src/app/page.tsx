import { NewsCard } from "@/components/cards/NewsCard";
import { TestimonialCard } from "@/components/cards/TestimonialCard";
import { Carousel } from "@/components/sections/Carousel";
import { HappeningNow } from "@/components/sections/HappeningNow";
import { Hero } from "@/components/sections/Hero";
import { HeroSlider } from "@/components/sections/HeroSlider";
import { IntroductionText } from "@/components/sections/IntroductionText";
import { Memberships } from "@/components/sections/Memberships";
import { Newsletter } from "@/components/sections/Newsletter";
import { SpacesCarousel } from "@/components/sections/SpacesCarousel";
import { getHomePage, getSiteSettings } from "@/lib/content";

export default async function Home() {
  const { hero, slider, network, happeningNow, memberships, introduction, testimonials, news, newsletter } =
    await getHomePage();
  const { book } = await getSiteSettings();

  return (
    <>
      <Hero {...hero} />
      {slider.length > 0 && <HeroSlider slides={slider} />}

      <SpacesCarousel {...network} defaultCta={book} />

      {happeningNow.events.length > 0 && <HappeningNow {...happeningNow} />}
      <Memberships {...memberships} />
      <IntroductionText {...introduction} />

      <Carousel trackClassName="py-32 lg:py-12" arrows={false}>
        {testimonials.map((testimonial) => (
          <TestimonialCard key={testimonial.author} testimonial={testimonial} className="w-[337px] lg:w-[428px]" />
        ))}
      </Carousel>

      <Carousel eyebrow={news.eyebrow} title={news.title} trackClassName="py-12 lg:gap-4">
        {news.items.map((item) => (
          <NewsCard key={item.href} item={item} className="w-[388px] max-w-[calc(100vw-52px)] lg:w-[540px]" />
        ))}
      </Carousel>

      <Newsletter description={newsletter.description} />
    </>
  );
}
