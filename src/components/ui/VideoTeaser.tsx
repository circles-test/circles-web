"use client";

import { IconPlayerPlayFilled, IconX } from "@tabler/icons-react";
import { useRef } from "react";
import { IconButton } from "./IconButton";
import { Media } from "./Media";

/**
 * Figma: "Video" thumbnail ("Discover Circles House") + "Video Player" modal.
 */
export function VideoTeaser({ label, poster, src }: { label: string; poster?: string; src?: string }) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  function close() {
    videoRef.current?.pause();
    dialogRef.current?.close();
  }

  return (
    <>
      <button
        type="button"
        onClick={() => dialogRef.current?.showModal()}
        className="group flex w-[317px] flex-col gap-2 text-left"
      >
        <span className="relative block h-[188px] w-full overflow-hidden">
          <Media src={poster} alt="" sizes="317px" imageClassName="transition-transform duration-500 group-hover:scale-105" />
        </span>
        <span className="flex h-4 w-full items-center gap-2.5">
          <span className="flex-1 text-detail">{label}</span>
          <IconPlayerPlayFilled aria-hidden size={16} />
        </span>
      </button>

      <dialog
        ref={dialogRef}
        aria-label={label}
        onClick={(event) => event.target === event.currentTarget && close()}
        onClose={() => videoRef.current?.pause()}
        className="m-auto w-[calc(100%-32px)] max-w-[1241px] bg-transparent backdrop:bg-black/80"
      >
        <div className="relative aspect-video w-full bg-black">
          {src ? (
            <video ref={videoRef} src={src} poster={poster} controls playsInline className="size-full" />
          ) : (
            <Media src={poster} alt="" />
          )}
          <IconButton
            label="Close video"
            onClick={close}
            icon={<IconX size={16} stroke={1.5} />}
            tone="light"
            shape="circle"
            slide="none"
            className="absolute top-4 right-4"
          />
        </div>
      </dialog>
    </>
  );
}
