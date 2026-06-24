import Image from "next/image"

const Content = () => {
  return (
    <div className="custom-width py-15">

      <div className="flex flex-col md:flex-row items-center justify-center md:justify-between gap-5 mb-5">
        <div className="w-full md:w-[50%]">
          <h2 className="text-[24px] font-medium">Heading</h2>
          <p className="leading-6 mt-3 text-[#1C1C1C80]">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ipsam repellendus a esse, neque earum quisquam, voluptatum quos necessitatibus architecto quae illo excepturi, rerum voluptatem aut officia! At reprehenderit suscipit odit.Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ipsam repellendus a esse, neque earum quisquam, voluptatum quos necessitatibus architecto quae illo excepturi, rerum voluptatem aut officia! At reprehenderit suscipit odit.</p>
          <p className="leading-6 mt-3 text-[#1C1C1C80]">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ipsam repellendus a esse, neque earum quisquam, voluptatum quos necessitatibus architecto quae illo excepturi, rerum voluptatem aut officia! At reprehenderit suscipit odit.Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ipsam repellendus a esse, neque earum quisquam, voluptatum quos necessitatibus architecto quae illo excepturi, rerum voluptatem aut officia! At reprehenderit suscipit odit.</p>
        </div>
        <div className="w-full md:w-[50%] h-60 md:h-90">
          <Image src='/images/hero-bg.webp' alt='weekend-ux-lacation-hero-bg' width={150} height={120} className="w-full object-fill rounded-xl h-60 md:h-90" />
        </div>
      </div>
      <div className="leading-6 text-[#1C1C1C80]">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Aspernatur dolore, unde blanditiis rem quam eos tempora obcaecati expedita quos sed dolor harum aliquam accusamus. Ducimus, sapiente itaque molestiae ratione, ullam, magni officiis ex vitae saepe repellendus nisi dignissimos reprehenderit sint aspernatur possimus. Recusandae beatae doloribus nemo, velit voluptas voluptates sunt praesentium earum dolore doloremque, ratione fugit quidem, sit dolores architecto aut suscipit eum dolorem! Autem recusandae odit hic ipsam veritatis eius reprehenderit temporibus molestias beatae tempora, natus possimus. Repudiandae eum unde nisi totam voluptatem! Iusto dolore quasi, itaque maxime rem voluptatem. Exercitationem sed cumque officia a provident aliquam ipsa cupiditate maxime in optio eveniet laboriosam porro, architecto neque, facilis atque temporibus quam quaerat voluptas inventore illum laudantium modi? Natus, consequuntur maiores! Impedit quidem cumque dolor, atque aliquam doloribus exercitationem similique architecto facere molestiae velit numquam. Tempora facilis esse fugiat sit, quidem officiis molestias corrupti nihil itaque nulla vitae totam, fuga quaerat dolorum voluptas voluptatum ex sed? Ex assumenda repellendus voluptate ut quia hic laudantium eum dignissimos facere, excepturi quis sapiente modi repellat veritatis voluptatum quaerat esse aperiam! Quidem ratione ex placeat dolore possimus saepe nam. Cumque ad deserunt obcaecati inventore, illum adipisci. Sapiente sit eius itaque laborum provident officiis exercitationem!
      </div>
    </div>
  )
}

export default Content