from src.services.utils.upload_content import upload_content,delete_content


async def upload_video(video_file, activity_uuid, org_uuid, course_uuid):
    contents = video_file.file.read()
    video_format = video_file.filename.split(".")[-1]

    try:
        await upload_content(
            f"courses/{course_uuid}/activities/{activity_uuid}/video",
            'orgs',
            org_uuid,
            contents,
            f"video.{video_format}",
        )

    except Exception:
        return {"message": "There was an error uploading the file"}
    

async def delete_video(activity_uuid, org_uuid, course_uuid, video_format="mp4"):
    try:
        # Construct the path for the video file
        video_file_name = f"video.{video_format}"
        await delete_content(
            f"courses/{course_uuid}/activities/{activity_uuid}",
            'orgs',
            org_uuid,
            video_file_name,
        )
        return {"message": "Video file deleted successfully"}

    except Exception:
        return {"message": "There was an error deleting the file"}
    


