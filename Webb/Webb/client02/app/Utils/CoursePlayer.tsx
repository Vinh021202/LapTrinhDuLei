import React, { FC, useEffect, useState } from 'react'
import axios from 'axios';

type Props = {
    videoUrl: string;
    title: string;
}

const CoursePlayer: FC<Props> = ({ videoUrl }) => {
    const [videoData, setVideoData] = useState({
        otp: "",
        playbackInfo: "",
    });

    useEffect(() => {
        if (videoUrl.includes("localhost:8000")) {
            axios.post("http://localhost:8000/api/v1/getVdoCipherOTP", {
                videoId: videoUrl,
            }).then((res) => {
                setVideoData(res.data);
            });
        }
    }, [videoUrl]);

    // Kiểm tra nếu videoUrl là của Cloudinary hay của VdoCipher
    const isCloudinaryVideo = videoUrl.includes('res.cloudinary.com');

    return (
        <div style={{ paddingTop: "41%", position: "relative" }}>
            {isCloudinaryVideo ? (
                <video
                    controls
                    style={{
                        width: "100%",
                        height: "100%",
                        position: "absolute",
                        top: 0,
                        left: 0,
                    }}
                >
                    <source src={videoUrl} type="video/mp4" />
                    Your browser does not support the video tag.
                </video>
            ) : (
                videoData.otp && videoData.playbackInfo !== "" && (
                    <iframe
                        src={`https://player.vdocipher.com/v2/?otp=${videoData?.otp}&playbackInfo=${videoData.playbackInfo}&player=0ZSsAY6mVY8IfE6n`}
                        style={{
                            border: 0,
                            width: "100%",
                            height: "100%",
                            position: "absolute",
                            top: 0,
                            left: 0,
                        }}
                        allowFullScreen={true}
                        allow="encrypted-media"
                    >
                    </iframe>
                )
            )}
        </div>
    );
}

export default CoursePlayer;
