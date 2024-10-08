import { compileUiExtensions } from '@vendure/ui-devkit/compiler';
import {
    dummyPaymentHandler,
    DefaultJobQueuePlugin,
    DefaultSearchPlugin,
    VendureConfig,
    DefaultLogger,
    LogLevel,
} from '@vendure/core';
import { defaultEmailHandlers, EmailPlugin } from '@vendure/email-plugin';
import { AssetServerPlugin } from '@vendure/asset-server-plugin';
import { AdminUiPlugin } from '@vendure/admin-ui-plugin';
import 'dotenv/config';
import path from 'path';
import { otpEmailVerificationHandler } from './email-handlers/otp-email-handler';
import { ProductreviewPlugin } from './plugins/productreview/productreview.plugin';
import { DeletecustomerPlugin } from './plugins/deletecustomer/deletecustomer.plugin';
import { ExtendedcollectionPlugin } from './plugins/extendedcollection/extendedcollection.plugin';
import { BannersPlugin } from './plugins/banners/banners.plugin';
import { MultivendorPlugin } from './plugins/multivendor-plugin/multivendor.plugin';
import { ResponseLoggerPlugin } from './plugins/response-logger/response-logger.plugin';
import { SES, SendRawEmailCommand } from '@aws-sdk/client-ses'
import { EmailNameValidationPlugin } from './plugins/email-name-validation/email-name-validation.plugin';
import { PaymentPlugin } from './plugins/payment/payment.plugin';
import { razorpayPaymentMethodHandler } from './plugins/payment/my-payment-handler';
import { WishlistPlugin } from './plugins/wishlist/wishlist.plugin';

const IS_DEV = process.env.APP_ENV === 'dev';
console.log(__dirname)
const ses = new SES({
    apiVersion: '2010-12-01',
    region: 'ap-south-1' ,
    credentials: {
      accessKeyId: process.env.SES_ACCESS_KEY || '',
      secretAccessKey: process.env.SES_SECRET_KEY || '',
    },
  });

export const config: VendureConfig = {
    
    apiOptions: {
        hostname:"0.0.0.0",
        port: 5000,
        adminApiPath: 'admin-api',
        shopApiPath: 'shop-api',
        // The following options are useful in development mode,
        // but are best turned off for production for security
        // reasons.
        ...(IS_DEV ? {
            adminApiPlayground: {
                settings: { 'request.credentials': 'include' },
            },
            adminApiDebug: false,
            shopApiPlayground: {
                settings: { 'request.credentials': 'include' },
            },
            shopApiDebug: false,
        } : {}),
    },
    logger:new DefaultLogger({ level: LogLevel.Debug }),
    authOptions: {
        requireVerification :false,
        tokenMethod: ['bearer', 'cookie'],
        superadminCredentials: {
            identifier: process.env.SUPERADMIN_USERNAME,
            password: process.env.SUPERADMIN_PASSWORD,
        },
        cookieOptions: {
          secret: process.env.COOKIE_SECRET,
        },
    },
    dbConnectionOptions: {
        type: 'mysql',
        // See the README.md "Migrations" section for an explanation of
        // the `synchronize` and `migrations` options.
        synchronize: false,
        migrations: [path.join(__dirname, './migrations/*.+(js|ts)')],
        logging: false,
        database: process.env.DB_NAME,
        host: process.env.DB_HOST,
        port: +process.env.DB_PORT,
        username: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD,
    },
    paymentOptions: {
        paymentMethodHandlers: [dummyPaymentHandler, razorpayPaymentMethodHandler],
    },
    // When adding or altering custom field definitions, the database will
    // need to be updated. See the "Migrations" section in README.md.
    customFields: {},
    plugins: [
        AssetServerPlugin.init({
            route: 'assets',
            assetUploadDir: path.join(__dirname, '../static/assets'),
            // For local dev, the correct value for assetUrlPrefix should
            // be guessed correctly, but for production it will usually need
            // to be set manually to match your production url.
            assetUrlPrefix: IS_DEV ? undefined : 'https://www.my-shop.com/assets/',
        }),
        DefaultJobQueuePlugin.init({ useDatabaseForBuffer: true }),
        DefaultSearchPlugin.init({ bufferUpdates: false, indexStockStatus: true }),
        EmailPlugin.init({
            handlers: [...defaultEmailHandlers,otpEmailVerificationHandler],
            transport: {
                type: 'ses',
                SES: { ses, aws: { SendRawEmailCommand } },
                sendingRate: 10, // optional messages per second sending rate
            },
            templatePath: path.join(__dirname, '../static/email/templates'),
            globalTemplateVars: {
                // The following variables will change depending on your storefront implementation.
                // Here we are assuming a storefront running at http://localhost:8080.
            
                fromAddress: 'noreply@qrcodx.com',
                verifyEmailAddressUrl: 'http://localhost:8080/verify',
                passwordResetUrl: 'http://localhost:8080/password-reset',
                changeEmailAddressUrl: 'http://localhost:8080/verify-email-address-change'
            },
        }),
        AdminUiPlugin.init({
            route: 'admin',
            port: 5002,
            adminUiConfig: {
                apiPort: 5000,
                brand:"Sulopa",
                hideVendureBranding:true,
                hideVersion:true,
                
            },
            // app: compileUiExtensions({
            //     outputPath: path.join(__dirname, '../admin-ui'),
            //     extensions: [
            //         ProductreviewPlugin.ui,
            //     ],
            //     devMode: true,
            // }),
        }),
        ProductreviewPlugin.init({}),
        DeletecustomerPlugin.init({allowDeleteWithOrders:true}),
        ExtendedcollectionPlugin.init({}),
        BannersPlugin.init({}),
        MultivendorPlugin.init({platformFeePercent: 10, platformFeeSKU: 'FEE',}),
        ResponseLoggerPlugin.init({}),
        EmailNameValidationPlugin.init({}),
        PaymentPlugin.init({}),
        WishlistPlugin.init({})
    ],
};
