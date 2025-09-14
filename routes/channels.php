<?php

use App\Models\User;
use Illuminate\Support\Facades\Broadcast;
use Illuminate\Support\Facades\Log;

Broadcast::channel('App.Models.User.{id}', function ($user, $id) {
    return (int) $user->id === (int) $id;
});

// A private channel for admin notifications.
Broadcast::channel('admin.bookings', function (User $user) {
    // Log::debug('Channel auth check', ['user_id' => $user->id, 'role' => $user->role]);
    return $user && $user->role === 'admin';
});

