<?php

namespace App\Http\Controllers;

use App\Actions\Transactions\CreateTransactionAction;
use App\Actions\Transactions\SettleTransactionAction;
use App\Actions\Transactions\UpdateTransactionAction;
use App\Http\Requests\Transactions\CreateTransactionRequest;
use App\Http\Requests\Transactions\UpdateTransactionRequest;
use App\Http\Resources\TransactionResource;
use App\Models\Transaction;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\AnonymousResourceCollection;

class TransactionController extends Controller
{
    public function index(Request $request): AnonymousResourceCollection
    {
        $transactions = Transaction::with('user')
            ->search($request->query('search'))
            ->ofType($request->query('type'))
            ->ofStatus($request->query('status'))
            ->orderByDesc('date')
            ->orderByDesc('created_at')
            ->get();

        return TransactionResource::collection($transactions);
    }

    public function store(CreateTransactionRequest $request, CreateTransactionAction $action): JsonResponse
    {
        return response()->json(new TransactionResource($action->execute($request)), 201);
    }

    public function show(Transaction $transaction): TransactionResource
    {
        return new TransactionResource($transaction->load('user'));
    }

    public function update(UpdateTransactionRequest $request, Transaction $transaction, UpdateTransactionAction $action): TransactionResource
    {
        return new TransactionResource($action->execute($transaction, $request));
    }

    public function settle(Transaction $transaction, SettleTransactionAction $action): TransactionResource
    {
        return new TransactionResource($action->execute($transaction));
    }

    public function destroy(Transaction $transaction): JsonResponse
    {
        $transaction->delete();

        return response()->json(null, 204);
    }
}
