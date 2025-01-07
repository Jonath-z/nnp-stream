import axios, { AxiosInstance } from "axios";
import { WISTIA_API_KEY } from "@/utils/constant";

class Wistia {
  private axiosInstance: AxiosInstance;
  constructor() {
    this.axiosInstance = axios.create({
      baseURL: "https://api.wistia.com/v1/",
      headers: {
        authorization: "Bearer " + WISTIA_API_KEY,
      },
    });
  }

  async getMediaMediaData(mediaId: string) {
    return await this.axiosInstance.get(`/medias/${mediaId}.json`);
  }
}

const wistia = new Wistia();
export default wistia;
