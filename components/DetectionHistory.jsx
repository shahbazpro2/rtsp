"use client";
import { getEventsListApi } from "@/apis/events";
import Loader from "@/components/ui/Loader";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { useParams } from "next/navigation";
import { useEffect } from "react";
import Zoom from "react-medium-image-zoom";
import "react-medium-image-zoom/dist/styles.css";
import { useApi } from "use-hook-api";
//2024-08-05
const currentDate = new Date().toISOString().split("T")[0];

const DetectionHistory = ({ cameraId, date }) => {
    const params = useParams();
    const [callApi, { data, loading }] = useApi({});

    useEffect(() => {
        if (!cameraId || !date) return;
        const formData = new FormData();
        formData.append("camera_id", cameraId);
        formData.append("event_day", date);
        callApi(getEventsListApi(formData));
    }, [cameraId, date]);
    console.log("params", params, cameraId, date);
    return (
        <div className="text-xl font-bold container mx-auto py-10">
            <div className="text-2xl font-bold mb-3">Detection History</div>

            {
                !data?.length && !loading && (
                    <div className="text-center font-normal">No data found</div>
                )

            }
            {loading ? (
                <div className="flex justify-center items-center">
                    <Loader />
                </div>
            ) : <div className="space-y-3">
                {data?.map((event) => (
                    <Accordion key={event?.id} type="single" collapsible className="w-full border border-gray-300 p-4 rounded-lg max-h-[70vh] overflow-auto" >
                        <AccordionItem value="item-1" className="border-none !py-0">
                            <AccordionTrigger className="py-1">
                                <div className="flex justify-between w-full">
                                    <div>{event?.EventID}</div>
                                    <div>{event?.EventTime}</div>
                                </div>
                            </AccordionTrigger>
                            <div className="grid grid-cols-1 gap-4">
                                {event?.Frames?.map((frame, index) => (
                                    <AccordionContent key={index} className="mx-3 border border-gray-200 rounded-lg">
                                        <div className="bg-gray-200 px-3 py-2 rounded flex justify-between">
                                            <div className="">{frame?.objects?.toString()}</div>
                                            <div>{frame?.Time}</div>
                                        </div>
                                        <div className="px-5 py-5">
                                            <Zoom>
                                                <img src={frame?.image || "/Mockup.jpg"} alt="frame" className="size-24" />
                                            </Zoom>
                                        </div>
                                    </AccordionContent>
                                ))}
                            </div>
                        </AccordionItem>
                    </Accordion>
                ))}
            </div>
            }

        </div>
    );
};

export default DetectionHistory;
