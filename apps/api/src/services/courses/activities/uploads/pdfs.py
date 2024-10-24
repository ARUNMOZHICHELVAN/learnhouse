from src.services.utils.upload_content import upload_content,delete_content


async def upload_pdf(pdf_file, activity_uuid, org_uuid, course_uuid):
    contents = pdf_file.file.read()
    pdf_format = pdf_file.filename.split(".")[-1]

    try:
        await upload_content(
            f"courses/{course_uuid}/activities/{activity_uuid}/documentpdf",
            "orgs",
            org_uuid,
            contents,
            f"documentpdf.{pdf_format}",
        )

    except Exception:
        return {"message": "There was an error uploading the file"}
    

async def delete_pdf(activity_uuid, org_uuid, course_uuid, pdf_format="pdf"):
    try:
        # Construct the path for the PDF file
        pdf_file_name = f"documentpdf.{pdf_format}"
        await delete_content(
            f"courses/{course_uuid}/activities/{activity_uuid}",
            "orgs",
            org_uuid,
            pdf_file_name,
        )
        return {"message": "PDF file deleted successfully."}

    except Exception as e:
        return {"message": f"There was an error deleting the file: {str(e)}"}
