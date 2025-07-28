import axios from 'axios'
import { get } from 'lodash'

/** Khởi tạo hàm request từ axios */
export class Request {
    /** header của request */
    #headers: any

    /** set header */
    public setHeaders(headers: any) {
        this.#headers = headers
    }

    /** Gửi request post */
    public async post<T>(
        url: string,
        data: any,
        headers?: object
    ): Promise<any> {
        try {

            /** Gửi request */
            const result = await axios.post(url, data, {
                headers: {
                    'Content-Type': 'application/json',
                    ...this.#headers,
                    ...headers
                }
            })

            /** Trả về kết quả */
            return result?.data?.data || result?.data || result

        } catch (e) {
            throw get(e, 'response.data.message') ||
            get(e, 'response.message') ||
            get(e, 'response') ||
            get(e, 'message') ||
            e
        }
    }
}