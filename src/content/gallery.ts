import type { Localized } from '../i18n/locales.ts'

export interface GalleryImage {
  /** Paths inside public/, without a leading slash. */
  thumbSmall: string
  thumb: string
  full: string
  /** Size of the full image. */
  width: number
  height: number
  /** Size of the thumbnail, used to reserve space before it loads. */
  thumbWidth: number
  thumbHeight: number
  alt: Localized
  caption: Localized
}

const photo = (
  name: string,
  full: [number, number],
  thumb: [number, number],
  caption: Localized,
  alt: Localized,
): GalleryImage => ({
  thumbSmall: `images/gallery/${name}-thumb-sm.webp`,
  thumb: `images/gallery/${name}-thumb.webp`,
  full: `images/gallery/${name}.webp`,
  width: full[0],
  height: full[1],
  thumbWidth: thumb[0],
  thumbHeight: thumb[1],
  caption,
  alt,
})

// To add a photo: put `<name>.webp` (long edge ~1600px), `<name>-thumb.webp` (640px wide) and
// `<name>-thumb-sm.webp` (360px wide) in public/images/gallery/ and add a line here.
export const gallery: GalleryImage[] = [
  photo(
    'quadruped-switchgear-hall',
    [1200, 1600],
    [640, 853],
    {
      en: 'Quadruped inspection robot in a 230 kV switchgear hall',
      th: 'หุ่นยนต์ตรวจสอบสี่ขาในห้องสวิตช์เกียร์ 230 kV',
    },
    {
      en: 'Thitiwut giving a thumbs up behind a quadruped inspection robot in a power plant switchgear hall',
      th: 'Thitiwut ชูนิ้วโป้งอยู่หลังหุ่นยนต์ตรวจสอบสี่ขาในห้องสวิตช์เกียร์ของโรงไฟฟ้า',
    },
  ),
  photo(
    'quadruped-substation',
    [1600, 900],
    [640, 360],
    { en: 'Robot inspection run at a substation', th: 'หุ่นยนต์ออกตรวจสอบที่สถานีไฟฟ้าย่อย' },
    {
      en: 'Selfie in an AI and Robotics Ventures hard hat with a quadruped robot at an electrical substation',
      th: 'เซลฟีขณะสวมหมวกนิรภัย AI and Robotics Ventures กับหุ่นยนต์สี่ขาที่สถานีไฟฟ้าย่อย',
    },
  ),
  photo(
    'site-visit-coveralls',
    [900, 1600],
    [640, 1138],
    {
      en: 'Site visit in AI and Robotics Ventures coveralls',
      th: 'ลงพื้นที่ในชุดหมีของ AI and Robotics Ventures',
    },
    {
      en: 'Thitiwut in orange coveralls and a hard hat at an industrial construction yard with cranes',
      th: 'Thitiwut ในชุดหมีสีส้มและหมวกนิรภัย ที่ลานก่อสร้างอุตสาหกรรมซึ่งมีปั้นจั่น',
    },
  ),
  photo(
    'quadruped-power-plant',
    [1600, 900],
    [640, 360],
    {
      en: 'Outdoor test of a quadruped robot at a power plant',
      th: 'ทดสอบหุ่นยนต์สี่ขากลางแจ้งที่โรงไฟฟ้า',
    },
    {
      en: 'Selfie in a hard hat with a quadruped robot walking along a road at a power plant',
      th: 'เซลฟีขณะสวมหมวกนิรภัย กับหุ่นยนต์สี่ขาที่เดินอยู่บนถนนในโรงไฟฟ้า',
    },
  ),
  photo(
    'delivery-robot-field-work',
    [1280, 853],
    [640, 427],
    {
      en: 'Working on the 7-Eleven outdoor delivery robot',
      th: 'ทำงานกับหุ่นยนต์ส่งของกลางแจ้งของ 7-Eleven',
    },
    {
      en: 'Thitiwut kneeling with a laptop, working on the 7-Eleven outdoor delivery robot',
      th: 'Thitiwut คุกเข่าพร้อมแล็ปท็อป ขณะทำงานกับหุ่นยนต์ส่งของกลางแจ้งของ 7-Eleven',
    },
  ),
  photo(
    'delivery-robot-iiec-lab',
    [1200, 1600],
    [640, 853],
    {
      en: 'With the delivery robot at the Innovation and Invention Excellence Center, PIM',
      th: 'กับหุ่นยนต์ส่งของที่ Innovation and Invention Excellence Center, PIM',
    },
    {
      en: 'Thitiwut sitting on the 7-Eleven delivery robot in front of a whiteboard of robot path diagrams',
      th: 'Thitiwut นั่งบนหุ่นยนต์ส่งของ 7-Eleven หน้ากระดานที่มีแผนภาพเส้นทางของหุ่นยนต์',
    },
  ),
  photo(
    'delivery-robot-testing',
    [828, 1472],
    [640, 1138],
    { en: 'Testing the delivery robot in the lab', th: 'ทดสอบหุ่นยนต์ส่งของในห้องแล็บ' },
    {
      en: 'Thitiwut sitting on the delivery robot and giving a thumbs up',
      th: 'Thitiwut นั่งบนหุ่นยนต์ส่งของและชูนิ้วโป้ง',
    },
  ),
  photo(
    'delivery-robot',
    [1600, 900],
    [640, 360],
    {
      en: 'The 7-Eleven outdoor delivery robot and its 3D LiDAR',
      th: 'หุ่นยนต์ส่งของกลางแจ้งของ 7-Eleven กับเซนเซอร์ 3D LiDAR',
    },
    {
      en: 'White, green and orange 7-Eleven delivery robot with a LiDAR sensor on top',
      th: 'หุ่นยนต์ส่งของ 7-Eleven สีขาว เขียว และส้ม ที่มีเซนเซอร์ LiDAR อยู่ด้านบน',
    },
  ),
]
