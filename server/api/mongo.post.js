import blacklistNumberModel from "~/server/models/blacklist-number";
import phoneNumberModel from "~/server/models/phone-number";
import { addMinutes, format } from "date-fns";
import { api } from 'zadarma'


export default defineEventHandler(async (event) => {
    const body = await readBody(event)

    const blacklistNumber = await blacklistNumberModel.findOne({number: body.number})

    if (blacklistNumber) {
        return {message: 'Numer na czarnej liście'}
    }

    const phoneNumber = await phoneNumberModel.findOne({number: body.number, expires_at: {$gte: Date.now()}});

    if (phoneNumber) {
        return {message: `Wstrzymaj się mordo, wygasa ${ format(phoneNumber.expires_at, 'y-MM-dd HH:mm:ss') }`}
    }

    phoneNumberModel.create({number: body.number, expires_at: addMinutes(Date.now(), 1)})

    const brevoResponse = await fetch("https://api.brevo.com/v3/smtp/email", {
        method: "POST",
        headers: {
            accept: "application/json",
            "api-key": process.env.BREVO_API_KEY,
            "content-type": "application/json",
        },
        body: JSON.stringify({
            sender: {
                name: "Lexxo.pl",
                email: "wershapes@gmail.com",
            },
            replyTo: {
                email: "wershapes@wershapes.com",
                name: "Lexxo.pl"
            },
            to: [
                {
                    email: "konrad@minister.com",
                    name: `To NAME`,
                }
            ],
            subject: "Nowy furmularz kontaktowy",
            htmlContent: `<html><head></head><body><p>Numer telefonu: +48${ body.number }</p></body></html>`,
            textContent: "Nowy furmularz kontaktowy",
        })
    })

    const zadarmaResponse = await api({
        api_method: '/v1/request/callback/',
        params: {
            to: '+48450066055',
            from: `+48${ body.number }`,
            sip: '423876',
            predicted: 'predicted'
        }
    });

    // check zadarma response

    return {message: 'Zaraz zadzwonimy'}
})
