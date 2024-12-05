import React, { FC, useEffect, useState } from 'react'
import axios from 'axios';

type Props = {
    videoUrl:string;
    title:string;
}

const CoursePlayer:FC<Props> = ({videoUrl}) => {
    const [videoData, setVideoData] = useState({
        otp: "",
        playbackInfo: "",
    });

    useEffect(() => {
        axios.post("http://localhost:8000/api/v1/getVdoCipherOTP",{
            videoId: videoUrl,
        }).then((res) => {
            setVideoData(res.data);
        })
    },[videoUrl])



    return ( 
        <div style={{paddingTop : "41%", position:"relative"}}>
            {
                videoData.otp && videoData.playbackInfo !== "" && (
                    <iframe
                        src={`https://player.vdocipher.com/v2/?otp=${videoData?.otp}&playbackInfo=${videoData.playbackInfo}&player=0ZSsAY6mVY8IfE6n`}
                        // src="https://player.vdocipher.com/v2/?otp=20160313versASE323EEPEiKbHLBXYfb6wjd1DZhnQLK5fVotQAh2wozWH2VC
                        // xhh&playbackInfo=eyJ2aWRlb0lkIjoiN2EyYzhlOTU4NjFhZGNmZjhlO
                        // WUyNDI5NTg5Y2M3MGMifQ==txv5mzq1cXHTPonU"
                        style={{
                            border: 0,
                            width: "90%",
                            height: "100%",
                            position: "absolute",
                            top: 0,
                            left: 0,
                        }}
                        allowFullScreen={true}
                        allow="encrypted-media"
                    >

                    </iframe>
                )}
        </div>
    )
}

export default CoursePlayer