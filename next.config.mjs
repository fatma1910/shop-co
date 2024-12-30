/** @type {import('next').NextConfig} */
const nextConfig = {
    api: {
        bodyParser: {
          sizeLimit: "10mb", 
        },
      },
      images : {
        domains:['res.cloudinary.com',
            
        ]
    }
};

export default nextConfig;
``