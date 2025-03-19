"use client";

import { useState, useRef } from "react";
import { Camera, X, Upload } from "lucide-react";
import { Button } from "@/components/ui/button";

export function ImageUpload({ value, onChange, disabled, variant = "avatar" }) {
  const [preview, setPreview] = useState(value);
  const fileInputRef = useRef(null);

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      setPreview(reader.result);
      onChange(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const handleRemove = (e) => {
    e.stopPropagation();
    setPreview("");
    onChange("");
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const isAvatar = variant === "avatar";

  return (
    <div
      onClick={() => fileInputRef.current?.click()}
      className={`relative cursor-pointer border-2 border-dashed rounded-lg transition-all hover:opacity-80 ${
        disabled ? "opacity-50 cursor-not-allowed" : ""
      } ${
        isAvatar
          ? "w-40 h-40 mx-auto rounded-full overflow-hidden"
          : "w-full aspect-video"
      }`}
    >
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        disabled={disabled}
        className="hidden"
      />

      {preview ? (
        <>
          <img
            src={preview || "/placeholder.svg"}
            alt={isAvatar ? "Avatar" : "Cover"}
            className={`w-full h-full object-cover ${
              isAvatar ? "rounded-full" : ""
            }`}
          />
          <Button
            type="button"
            variant="destructive"
            size="icon"
            className="absolute top-2 right-2 h-8 w-8 rounded-full"
            onClick={handleRemove}
            disabled={disabled}
          >
            <X className="h-4 w-4" />
            <span className="sr-only">Remove image</span>
          </Button>
        </>
      ) : (
        <div className="flex flex-col items-center justify-center h-full p-4 text-center">
          {isAvatar ? (
            <Camera className="h-10 w-10 mb-2 text-muted-foreground" />
          ) : (
            <Upload className="h-10 w-10 mb-2 text-muted-foreground" />
          )}
          <p className="text-sm font-medium">
            {isAvatar ? "Upload profile picture" : "Upload cover image"}
          </p>
          <p className="text-xs text-muted-foreground mt-1">
            Click to browse or drag and drop
          </p>
        </div>
      )}
    </div>
  );
}