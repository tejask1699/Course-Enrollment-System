'use client'

import React, { useEffect, useState } from 'react';
import { Tooltip, TooltipContent, TooltipTrigger } from '../ui/tooltip';

const HeaderProfile = () => {
    const [name, setName] = useState('TejasK');
    const [initials, setInitials] = useState('T');

    useEffect(() => {
        const storedName = localStorage.getItem('userName') || '';
        setName(storedName);

        if (storedName) {
            const nameParts = storedName.trim().split(' ');
            const initials = nameParts.map(part => part[0]).join('').toUpperCase();
            setInitials(initials);
        }
    }, []);

    return (
        <div className="flex items-center justify-center">
            <Tooltip>
                <TooltipTrigger asChild>
                    <div className="w-10 h-10 rounded-full bg-green-600 text-white flex items-center justify-center font-semibold text-sm cursor-pointer">
                        {initials}
                    </div>
                </TooltipTrigger>
                <TooltipContent side='bottom'>
                    {name}
                </TooltipContent>
            </Tooltip>
        </div>
    );
};

export default HeaderProfile;
