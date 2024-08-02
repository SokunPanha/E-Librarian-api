import {v2} from "cloudinary"

export const CloudinaryProvider = {
    provide: "CLOUDINARY",
    useFactory : () => {
return v2.config({
    cloud_name: 'durinso4w',
    api_key: '474278457728537',
    api_secret: 'NWU1MWEvz0VhPlZgxj9IRkb3-6I'
});
    }
}
