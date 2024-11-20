from typing import Literal, Optional
import boto3
from botocore.exceptions import ClientError
import os 
import shutil

from fastapi import HTTPException

from config.config import get_learnhouse_config


async def upload_content(
    directory: str,
    type_of_dir: Literal["orgs", "users"],
    uuid: str,  # org_uuid or user_uuid
    file_binary: bytes,
    file_and_format: str,
    allowed_formats: Optional[list[str]] = None,
):
    # Get Learnhouse Config
    learnhouse_config = get_learnhouse_config()

    file_format = file_and_format.split(".")[-1].strip().lower()

    # Get content delivery method
    content_delivery = learnhouse_config.hosting_config.content_delivery.type

    # Check if format file is allowed
    if allowed_formats:
        if file_format not in allowed_formats:
            raise HTTPException(
                status_code=400,
                detail=f"File format {file_format} not allowed",
            )

    if content_delivery == "filesystem":
        # create folder for activity
        if not os.path.exists(f"content/{type_of_dir}/{uuid}/{directory}"):
            # create folder for activity
            os.makedirs(f"content/{type_of_dir}/{uuid}/{directory}")
        # upload file to server
        with open(
            f"content/{type_of_dir}/{uuid}/{directory}/{file_and_format}",
            "wb",
        ) as f:
            f.write(file_binary)
            f.close()

    elif content_delivery == "s3api":
        # Upload to server then to s3 (AWS Keys are stored in environment variables and are loaded by boto3)
        # TODO: Improve implementation of this
        print("Uploading to s3...")
        s3 = boto3.client(
            "s3",
            endpoint_url=learnhouse_config.hosting_config.content_delivery.s3api.endpoint_url,
        )

        # Create folder for activity
        if not os.path.exists(f"content/{type_of_dir}/{uuid}/{directory}"):
            # create folder for activity
            os.makedirs(f"content/{type_of_dir}/{uuid}/{directory}")

        # Upload file to server
        with open(
            f"content/{type_of_dir}/{uuid}/{directory}/{file_and_format}",
            "wb",
        ) as f:
            f.write(file_binary)
            f.close()

        print("Uploading to s3 using boto3...")
        try:
            s3.upload_file(
                f"content/{type_of_dir}/{uuid}/{directory}/{file_and_format}",
                "learnhouse-media",
                f"content/{type_of_dir}/{uuid}/{directory}/{file_and_format}",
            )
        except ClientError as e:
            print(e)

        print("Checking if file exists in s3...")
        try:
            s3.head_object(
                Bucket="learnhouse-media",
                Key=f"content/{type_of_dir}/{uuid}/{directory}/{file_and_format}",
            )
            print("File upload successful!")
        except Exception as e:
            print(f"An error occurred: {str(e)}")


async def delete_content(
    directory: str,
    type_of_dir: Literal["orgs", "users"],
    uuid: str,  # org_uuid or user_uuid
    file_and_format: str,
):
    # Get Learnhouse Config
    learnhouse_config = get_learnhouse_config()

    # Get content delivery method
    content_delivery = learnhouse_config.hosting_config.content_delivery.type

    # Construct the local path for the activity directory
    activity_directory = f"content/{type_of_dir}/{uuid}/{directory}"

    if content_delivery == "filesystem":
        # Check if the activity directory exists
        if os.path.exists(activity_directory):
            # Delete the entire activity directory
            shutil.rmtree(activity_directory)
            print(f"Directory {activity_directory} deleted successfully.")
        else:
            print(f"Directory {activity_directory} does not exist.")

    elif content_delivery == "s3api":
        # Delete files in the activity directory from S3
        s3 = boto3.client(
            "s3",
            endpoint_url=learnhouse_config.hosting_config.content_delivery.s3api.endpoint_url,
        )

        # List and delete all objects in the activity directory
        try:
            objects_to_delete = s3.list_objects_v2(
                Bucket="learnhouse-media",
                Prefix=f"content/{type_of_dir}/{uuid}/{directory}/"
            )

            if 'Contents' in objects_to_delete:
                for obj in objects_to_delete['Contents']:
                    s3.delete_object(
                        Bucket="learnhouse-media",
                        Key=obj['Key']
                    )
                print(f"All files in {activity_directory} deleted from S3 successfully.")

            # Optionally, you can delete the 'directory' concept by not implementing it in S3

        except ClientError as e:
            print(f"Failed to delete files from S3: {str(e)}")
