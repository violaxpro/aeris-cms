import React, { useState } from 'react'
import Modal from '@/components/modal'
import Divider from '@/components/divider'
import { GmailIcon } from '@public/icon';
import Button from '@/components/button'

type ModalEmailPreviewProps = {
    isModalOpen: boolean
    handleCancel: () => void
    handleSubmit?: any
}

const ModalEmailPreview = ({
    handleCancel,
    isModalOpen,
    handleSubmit
}: ModalEmailPreviewProps) => {
    const handleClick = () => {
        console.log('Claim your discount!')
    }

    return (
        <>
            <Modal
                open={isModalOpen}
                title='Message'
                handleCancel={handleCancel}
                iconLeftTitle={GmailIcon}
            >
                <div className='flex flex-col gap-3'>
                    <div>
                        <span className='text-lg'>Protect Your Home – 20% Off Alarm Systems</span>
                    </div>
                    <Divider />
                    <div className="space-y-4 text-sm">
                        <p>
                            Hello,
                        </p>
                        <p>
                            Winter is here — keep your home safe and your family protected.
                            For a limited time only, enjoy <b>20% OFF our premium alarm systems</b>.
                        </p>

                        <p>Here are your shipping details:</p>
                        <ul className="list-disc list-inside space-y-1">
                            <li>
                                Easy to install.
                            </li>
                            <li>
                                24/7 monitoring support
                            </li>
                            <li>
                                Trusted by thousands of Australian homes
                            </li>
                        </ul>

                        <div className='flex flex-col gap-3 justify-center items-center'>
                            <Button
                                label='Claim Your Discount Now'
                                onClick={handleClick}
                            />
                            <p>Hurry! Offer valid until 30 Sept 2025.</p>
                        </div>

                        <p>
                            Best regards,<br />
                            <b>Alarm Expert Australia Team</b>
                        </p>

                        <p>
                            You are receiving this email because you subscribed to Alarm Expert Australia.
                            If you no longer wish to receive these emails, Unsubscribe.
                        </p>
                    </div>
                </div>
            </Modal>

        </>

    )
}

export default ModalEmailPreview
