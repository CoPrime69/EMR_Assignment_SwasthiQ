import React, { useState, useEffect } from 'react';
import { X, Clock, User, Phone, Mail, Shield } from 'lucide-react';
import { Button, Input } from '../atoms';
import mockData from '../../data/mockData.json';

export const EventPanel = ({ isOpen, onClose, event, onSave }) => {
    const calculateEndTime = (startTime, duration) => {
        if (!startTime || !duration) return '09:30';
        const [h, m] = startTime.split(':').map(Number);
        const total = h * 60 + m + duration;
        return `${String(Math.floor(total / 60)).padStart(2, '0')}:${String(total % 60).padStart(2, '0')}`;
    };

    const [formData, setFormData] = useState({
        title: '',
        date: new Date().toISOString().slice(0, 10),
        startTime: '08:30',
        endTime: '09:30',
        patientName: '',
        phone: '',
        email: '',
        doctor: 'doc-1',
        abhaid: ''
    });

    useEffect(() => {
        if (event) {
            setFormData({
                title: event.reason || '',
                date: event.date || new Date().toISOString().slice(0, 10),
                startTime: event.time || '08:30',
                endTime:
                    event.time && event.duration
                        ? calculateEndTime(event.time, event.duration)
                        : '09:30',
                patientName: event.name || '',
                phone: event.phone || '',
                email: event.email || '',
                doctor: 'doc-1',
                abhaid: ''
            });
        }
    }, [event]);

    if (!isOpen) return null;

    const handleChange = (key, value) => {
        setFormData(prev => ({ ...prev, [key]: value }));
    };

    return (
        /* Overlay positioning only */
        <div className="fixed inset-y-0 right-0 z-40 flex items-start">
            {/* Panel */}
            <div className="w-96 bg-white border-l shadow-lg flex flex-col mt-6 mr-6 rounded-lg">

                {/* Header */}
                <div className="px-6 py-4 border-b flex items-center justify-between">
                    <h2 className="text-lg font-semibold text-gray-900">
                        {event ? 'Edit Event' : 'New Event'}
                    </h2>
                    <button
                        onClick={onClose}
                        className="p-1 rounded hover:bg-gray-100"
                    >
                        <X size={20} className="text-gray-500" />
                    </button>
                </div>

                {/* Content */}
                <div className="px-6 py-6 space-y-6 max-h-[70vh] overflow-y-auto">

                    <Input
                        value={formData.title}
                        onChange={e => handleChange('title', e.target.value)}
                        placeholder="Add title"
                    />

                    <button className="w-full py-2 border rounded-lg text-sm hover:bg-gray-50">
                        New Event
                    </button>

                    <div className="flex gap-3">
                        <Clock className="text-gray-400 mt-1" size={18} />
                        <div>
                            <div className="font-medium">
                                {new Date(formData.date).toLocaleDateString('en-US', {
                                    weekday: 'long',
                                    year: 'numeric',
                                    month: 'long',
                                    day: 'numeric'
                                })}
                            </div>
                            <div className="flex gap-2 mt-2">
                                <input
                                    type="time"
                                    value={formData.startTime}
                                    onChange={e => handleChange('startTime', e.target.value)}
                                    className="px-2 py-1 border rounded"
                                />
                                <span>-</span>
                                <input
                                    type="time"
                                    value={formData.endTime}
                                    onChange={e => handleChange('endTime', e.target.value)}
                                    className="px-2 py-1 border rounded"
                                />
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <Input
                            icon={User}
                            placeholder="Add patient name"
                            value={formData.patientName}
                            onChange={e => handleChange('patientName', e.target.value)}
                        />
                        <Input
                            icon={Phone}
                            placeholder="Add phone number"
                            value={formData.phone}
                            onChange={e => handleChange('phone', e.target.value)}
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <Input
                            icon={Mail}
                            placeholder="Add email address"
                            value={formData.email}
                            onChange={e => handleChange('email', e.target.value)}
                        />
                        <Input
                            icon={Shield}
                            placeholder="Add ABHA ID (Optional)"
                            value={formData.abhaid}
                            onChange={e => handleChange('abhaid', e.target.value)}
                        />
                    </div>

                    <div className="flex items-center gap-3 p-4 bg-blue-50 rounded-lg">
                        <div className="w-10 h-10 bg-blue-500 text-white rounded-full flex items-center justify-center font-bold">
                            {mockData.doctors
                                .find(d => d.id === formData.doctor)
                                ?.name.split(' ')
                                .map(n => n[0])
                                .join('')}
                        </div>
                        <div className="flex-1">
                            <select
                                value={formData.doctor}
                                onChange={e => handleChange('doctor', e.target.value)}
                                className="w-full bg-transparent font-medium outline-none"
                            >
                                {mockData.doctors.map(doc => (
                                    <option key={doc.id} value={doc.id}>
                                        {doc.name}
                                    </option>
                                ))}
                            </select>
                            <div className="text-xs text-gray-600">
                                {mockData.doctors.find(d => d.id === formData.doctor)?.specialty}
                                {' '}– Notify 30 minutes before
                            </div>
                        </div>
                    </div>
                </div>

                {/* Footer */}
                <div className="px-6 py-4 border-t flex justify-between bg-white rounded-b-lg">
                    <Button variant="ghost" size="sm">
                        More options
                    </Button>
                    <Button variant="primary" size="sm" onClick={() => onSave(formData)}>
                        Save
                    </Button>
                </div>
            </div>
        </div>
    );
};
