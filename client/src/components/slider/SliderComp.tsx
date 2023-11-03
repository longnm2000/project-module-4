import Slider from "react-slick";

interface Image {
    pictureId: number;
    productId: number;
    source: string;
    type: number;
}

function SliderComp({ images }: { images: Image[] }) {
    const settings = {
        dots: true,
        fade: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 2000,
        pauseOnHover: true
    };
    console.log(images);

    return (
        <div>
            <Slider {...settings}>
                {images.map((e: Image, i: number) => <div>
                    <img key={i} src={e.source} alt={e.source} width={"100%"} />
                </div>)}
            </Slider>
        </div>
    );
}

export default SliderComp;
