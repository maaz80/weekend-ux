import ZoomMeetingModal from "./ZoomMeetingModal";

export default {
     title: "Components/ZoomMeetingModal",
     component: ZoomMeetingModal,
     parameters: {
          layout: "fullscreen",
     },
};

export const Open = {
     args: {
          courseTitle: "UI/UX Design Masterclass",
          liveClass: {
               meetUrl: "https://zoom.us/j/1234567890",
               zoomMeetingId: "123 456 7890",
               zoomPasscode: "UX9876",
               title: "Live Portfolio Review Session",
               date: "Today at 7:00 PM",
               description: "Interactive session reviewing student case studies.",
          },
          onClose: () => {},
     },
};
