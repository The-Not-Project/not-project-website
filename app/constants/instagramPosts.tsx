import Image from "next/image";
import Link from "next/link";

export const data = [
  {
    "https://www.instagram.com/p/DM4AycKsxJt":
      "https://scontent-lga3-3.cdninstagram.com/v/t51.82787-15/527459392_17873278461400708_6940478644121075960_n.jpg?stp=dst-jpg_e35_tt6&_nc_cat=111&ig_cache_key=MzY5MDcwMzM0NDkwMTUwMTkwMA%3D%3D.3-ccb7-5&ccb=7-5&_nc_sid=58cdad&efg=eyJ2ZW5jb2RlX3RhZyI6InhwaWRzLjE0NDB4MTkyMC5zZHIuQzMifQ%3D%3D&_nc_ohc=1ozxKb-pMvcQ7kNvwH7Ksv_&_nc_oc=AdnUHPMo4_olft2Wa-k3EQQmQUm8-JhpuvT_pMNFzyozFuhGtl4gop5ymGOWegSidCA&_nc_ad=z-m&_nc_cid=0&_nc_zt=23&_nc_ht=scontent-lga3-1.cdninstagram.com&_nc_gid=bIM7NVyD5LpmpYJLjs8cyQ&oh=00_Afspn-CZdQYVc3E0oLJj60-GADvS4ymQGmUM969XvnF0lw&oe=698DA877",
  },
  {
    "https://www.instagram.com/p/DM_J1Wlvu5V":
      "https://scontent-lga3-3.cdninstagram.com/v/t51.82787-15/527402272_17873628078400708_5501429531819665850_n.jpg?stp=dst-jpg_e35_tt6&_nc_cat=100&ig_cache_key=MzY5MjcxMzQ0MDI4MDY5MTE4MQ%3D%3D.3-ccb7-5&ccb=7-5&_nc_sid=58cdad&efg=eyJ2ZW5jb2RlX3RhZyI6InhwaWRzLjE0NDB4MTQ0MC5zZHIuQzMifQ%3D%3D&_nc_ohc=S2LEhr2fk6MQ7kNvwEMTCi5&_nc_oc=Admn9P-jpEXEclSWTWGusYnAdsKCU5Qm8l9bSGapifLccoXN5jd1EcanABMB9BBRCOw&_nc_ad=z-m&_nc_cid=0&_nc_zt=23&_nc_ht=scontent-lga3-2.cdninstagram.com&_nc_gid=RN_UvJCjfbz1T2EHkRCMYw&oh=00_AfvmFWeeJAkAq3N_Fa_m6lXGlKAPz2GzhBayYqDiGIJVUA&oe=698DD1AF",
  },
  {
    "https://www.instagram.com/p/DM3rSHQv5_w":
      "https://scontent-lga3-3.cdninstagram.com/v/t51.82787-15/527604612_17873264889400708_7941308792136701232_n.jpg?stp=dst-jpg_e35_tt6&_nc_cat=102&ig_cache_key=MzY5MDYwODc1ODk5MzIwMTcyOA%3D%3D.3-ccb7-5&ccb=7-5&_nc_sid=58cdad&efg=eyJ2ZW5jb2RlX3RhZyI6InhwaWRzLjE0NDB4MTkyMC5zZHIuQzMifQ%3D%3D&_nc_ohc=nDp1lhc-ROcQ7kNvwF2bMCv&_nc_oc=AdmpASiltXIY_Tol8vDkW7txb4-WdBbJHoSmcJBNlIzx_AjM5b1-hZAlkNUgu6vjWCQ&_nc_ad=z-m&_nc_cid=0&_nc_zt=23&_nc_ht=scontent-lga3-1.cdninstagram.com&_nc_gid=RN_UvJCjfbz1T2EHkRCMYw&oh=00_AfuUujQQX8AFTugkHRCWFAA3U3gemkUhD1vqvP_PS0ihfg&oe=698DBE6A",
  },
  {
    "https://www.instagram.com/p/DM3t_6isOFd":
      "https://scontent-lga3-3.cdninstagram.com/v/t51.82787-15/527641784_17873279190400708_3923061252574429402_n.jpg?stp=dst-jpg_e15_tt6&_nc_cat=103&ig_cache_key=MzY5MDYyMDcyMzkzMjQ4ODAyOTE3ODczMjc5MTg3NDAwNzA4.3-ccb7-5&ccb=7-5&_nc_sid=58cdad&efg=eyJ2ZW5jb2RlX3RhZyI6InhwaWRzLjIzNDB4NDE2MC5zZHIuQzMifQ%3D%3D&_nc_ohc=PcViM6Uj1WUQ7kNvwEnYDEh&_nc_oc=AdkFINyS8ab-9profnyro8f5dhsBbuvznUU5PPKPVoa1_LIzYekQ5y3Tt-iuuYMdFw4&_nc_ad=z-m&_nc_cid=0&_nc_zt=23&_nc_ht=scontent-lga3-1.cdninstagram.com&_nc_gid=RN_UvJCjfbz1T2EHkRCMYw&oh=00_Aftl8CJHA70_IbYAAjOE8ZHJyXmCXv1XxBinFBOMTxU9VQ&oe=698D9F6E",
  },
  {
    "https://www.instagram.com/p/DM3nIxRPgNT/":
      "https://scontent-lga3-3.cdninstagram.com/v/t51.82787-15/527512533_17873279244400708_5135746189459241775_n.jpg?stp=dst-jpg_e15_tt6&_nc_cat=109&ig_cache_key=MzY5MDU5MDU0NjEyNTc4Mzg5MTE3ODczMjc5MjM4NDAwNzA4.3-ccb7-5&ccb=7-5&_nc_sid=58cdad&efg=eyJ2ZW5jb2RlX3RhZyI6InhwaWRzLjIzNDB4NDE2MC5zZHIuQzMifQ%3D%3D&_nc_ohc=es1AUYNLh94Q7kNvwG1RXxo&_nc_oc=AdlFMP0bECM12kUaF42wDciUDd4rzVXiVXsBBXXLZEQDG4PG3vYpNmuO4gsZ90-nEy8&_nc_ad=z-m&_nc_cid=0&_nc_zt=23&_nc_ht=scontent-lga3-2.cdninstagram.com&_nc_gid=RN_UvJCjfbz1T2EHkRCMYw&oh=00_AfsIooQJyBQ--SPgnSKpjWdmIzN9TAGv4ZW9-3EeBc-ITQ&oe=698DB66F",
  },
  {
    "https://www.instagram.com/p/DM3lvsgPyjb":
      "https://scontent-lga3-3.cdninstagram.com/v/t51.82787-15/527948187_17873261565400708_8187156184372715729_n.jpg?stp=dst-jpg_e35_tt6&_nc_cat=107&ig_cache_key=MzY5MDU4NDM5NzI3NjE1MjEzMg%3D%3D.3-ccb7-5&ccb=7-5&_nc_sid=58cdad&efg=eyJ2ZW5jb2RlX3RhZyI6InhwaWRzLjE0NDB4MTkyMC5zZHIuQzMifQ%3D%3D&_nc_ohc=ol4czLzm34QQ7kNvwGpSxfW&_nc_oc=AdlU59cyJm_KRIHJC9QitnPEYLuIOR7KAm1ypqS3vrNM3zWR1KAJyFQoNlLSLZ-yJuk&_nc_ad=z-m&_nc_cid=0&_nc_zt=23&_nc_ht=scontent-lga3-2.cdninstagram.com&_nc_gid=RN_UvJCjfbz1T2EHkRCMYw&oh=00_AfumCJj5_RNMCHprC0exAuRmj4vh9LtxOEKmtvuGAvfkSQ&oe=698DD4D3",
  },
  {
    "https://www.instagram.com/p/DMQtY4JvuwX":
      "https://scontent-lga3-3.cdninstagram.com/v/t51.82787-15/521627931_17871330045400708_7421065096948520112_n.jpg?stp=dst-jpg_e35_tt6&_nc_cat=104&ig_cache_key=MzY3OTY0MDUxMTA2NjM5MDc0OA%3D%3D.3-ccb7-5&ccb=7-5&_nc_sid=58cdad&efg=eyJ2ZW5jb2RlX3RhZyI6InhwaWRzLjE0NDB4OTYwLnNkci5DMyJ9&_nc_ohc=l6TdLJ52TwoQ7kNvwFX0PpQ&_nc_oc=AdkuiS1OkGgAwE_T7zgxlhfIGRH87aScshQyHyncXIGCNsE-cZZ71491I1pY3uGCReU&_nc_ad=z-m&_nc_cid=0&_nc_zt=23&_nc_ht=scontent-lga3-3.cdninstagram.com&_nc_gid=LV0fQbQDCyiOIIHrHY2Eng&oh=00_Afs-TjwGDjE0J4wkdXYV4vhJxKsvJTq3hmpuCcX9ne02AA&oe=698DB868",
  },

  {
    "https://www.instagram.com/p/DN39eZ5D5c1":
      "https://scontent-lga3-3.cdninstagram.com/v/t51.82787-15/539923178_17876436948400708_2127567651544868907_n.jpg?stp=dst-jpg_e35_tt6&_nc_cat=108&ig_cache_key=MzcwODcwMzE4ODM4NTI0MDg4NQ%3D%3D.3-ccb7-5&ccb=7-5&_nc_sid=58cdad&efg=eyJ2ZW5jb2RlX3RhZyI6InhwaWRzLjE0NDB4MTkyMC5zZHIuQzMifQ%3D%3D&_nc_ohc=U88OeSK7g-EQ7kNvwExD7U-&_nc_oc=AdliX0_X6SVbDo5suLq9V4_9p3AvBGdmUT0lbv8Ub2963z6xnpSQNClVa0CMtvxQnWA&_nc_ad=z-m&_nc_cid=0&_nc_zt=23&_nc_ht=scontent-lga3-3.cdninstagram.com&_nc_gid=yEJg_AqBPodP3epBogeZgw&oh=00_AftnME82wHzqhlcMrPKvTM47db0PnEI34l03QHOtE3yieA&oe=698DAA2C",
  },
  {
    "https://www.instagram.com/p/DMQsmo_vaNn":
      "https://scontent-lga3-3.cdninstagram.com/v/t51.82787-15/520108304_17871329028400708_1268135889816898380_n.jpg?stp=dst-jpg_e35_tt6&_nc_cat=110&ig_cache_key=MzY3OTYzNzA0ODc1MjEzMzIwMg%3D%3D.3-ccb7-5&ccb=7-5&_nc_sid=58cdad&efg=eyJ2ZW5jb2RlX3RhZyI6InhwaWRzLjE0NDB4MTkyMC5zZHIuQzMifQ%3D%3D&_nc_ohc=65lQDaj6R54Q7kNvwHVQch7&_nc_oc=AdkAQVWh9XLJ7FJ8hG8qX30KuX2-7y1Pyh9WtKJUgzTIqMXDEfc0NdyeFEinmhasVoI&_nc_ad=z-m&_nc_cid=0&_nc_zt=23&_nc_ht=scontent-lga3-3.cdninstagram.com&_nc_gid=LV0fQbQDCyiOIIHrHY2Eng&oh=00_AfsO_xnzyQYn3ETeNZJLYFdx13kg9be0UYUg2ddm70Enog&oe=698D9D12",
  },
];

export function InstagramPosts() {
  return (
    <>
      {data.map((post, index) => {
        const href = Object.keys(post)[0];
        const src = Object.values(post)[0];

        return (
          <div key={index}>
            <Link href={href} target="_blank">
            <Image src={src} alt="" fill sizes="33vw" />
            </Link>
          </div>
        );
      })}
    </>
  );
}
