import React from 'react';
import { Calendar, Clock, Video, Users, Phone, Mail, Edit2, Trash2, Check, X } from 'lucide-react';
import { Badge, Button } from '../atoms';

export const AppointmentCard = ({ appointment, onStatusUpdate, onEdit, onDelete }) => {
    const getStatusVariant = (status) => {
        const map = {
            'Confirmed': 'confirmed',
            'Scheduled': 'scheduled',
            'Upcoming': 'upcoming',
            'Cancelled': 'cancelled'
        };
        return map[status] || 'default';
    };

    const getModeVariant = (mode) => {
        return mode === 'Virtual' ? 'virtual' : 'default';
    };

    return (
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
            <div className="flex items-start gap-4">
                {/* Avatar */}
                <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold text-lg flex-shrink-0">
                    {appointment.name.split(' ').map(n => n[0]).join('')}
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                    {/* Header */}
                    <div className="flex items-start justify-between mb-2">
                        <div>
                            <h3 className="font-semibold text-gray-900 text-lg">{appointment.name}</h3>
                            <div className="flex items-center gap-2 mt-1 text-sm text-gray-600">
                                <Calendar size={14} />
                                <span>{appointment.date}</span>
                                <span>•</span>
                                <Clock size={14} />
                                <span>{appointment.time}</span>
                                <span>•</span>
                                <span>{appointment.duration} min</span>
                            </div>
                        </div>
                        <Badge variant={getStatusVariant(appointment.status)}>
                            {appointment.status}
                        </Badge>
                    </div>

                    {/* Doctor Info */}
                    <div className="flex items-center gap-2 text-sm text-gray-600 mb-2">
                        <Users size={14} />
                        <span>{appointment.doctorName}</span>
                        <span>•</span>
                        {appointment.mode === 'Virtual' ? <Video size={14} /> : <Users size={14} />}
                        <Badge variant={getModeVariant(appointment.mode)} className="text-xs">
                            {appointment.mode}
                        </Badge>
                    </div>

                    {/* Appointment Details */}
                    {appointment.appointmentType && (
                        <div className="bg-blue-50 rounded-lg p-3 mb-3">
                            <div className="flex items-start gap-2 mb-1">
                                <span className="text-xs font-medium text-blue-700">
                                    📋 {appointment.appointmentType}
                                </span>
                            </div>
                            {appointment.reason && (
                                <div className="text-xs text-gray-700 mb-1">
                                    <span className="font-medium">Reason:</span> {appointment.reason}
                                </div>
                            )}
                            {appointment.review && (
                                <div className="text-xs text-gray-700 mb-1">
                                    <span className="font-medium">Review:</span> {appointment.review}
                                </div>
                            )}
                            {appointment.note && (
                                <div className="text-xs text-gray-600">
                                    <span className="font-medium">Note:</span> {appointment.note}
                                </div>
                            )}
                        </div>
                    )}

                    {/* Contact Info + Actions */}
                    {(appointment.phone || appointment.email) && (
                        <div className="flex items-center justify-between gap-4 mt-4">
                            {/* Contact Info - Left */}
                            <div className="flex items-center gap-4 text-sm text-gray-600">
                                {appointment.phone && (
                                    <div className="flex items-center gap-1">
                                        <Phone size={14} />
                                        <span>{appointment.phone}</span>
                                    </div>
                                )}
                                {appointment.email && (
                                    <div className="flex items-center gap-1">
                                        <Mail size={14} />
                                        <span>{appointment.email}</span>
                                    </div>
                                )}
                            </div>

                            {/* Actions - Right */}
                            <div className="flex items-center gap-2">
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    icon={Edit2}
                                    onClick={() => onEdit(appointment)}
                                >
                                    Edit
                                </Button>

                                <Button
                                    variant="ghost"
                                    size="sm"
                                    icon={Trash2}
                                    onClick={() => onDelete(appointment)}
                                    className="text-red-600 hover:bg-red-50"
                                >
                                    Delete
                                </Button>

                                {appointment.status !== 'Confirmed' && appointment.status !== 'Cancelled' && (
                                    <Button
                                        variant="success"
                                        size="sm"
                                        icon={Check}
                                        onClick={() => onStatusUpdate(appointment.id, 'Confirmed')}
                                    >
                                        Confirm
                                    </Button>
                                )}

                                {appointment.status !== 'Cancelled' && (
                                    <Button
                                        variant="danger"
                                        size="sm"
                                        icon={X}
                                        onClick={() => onStatusUpdate(appointment.id, 'Cancelled')}
                                    >
                                        Cancel
                                    </Button>
                                )}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};
